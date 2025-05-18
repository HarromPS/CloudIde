// import express 
import express from "express";
import cors from "cors";
import connectToMongoDB from "./database/database.mjs";
import logReqRes from "./middlewares/log-req-res.js";
import dotenv from "dotenv";
import http from 'http';
import fs from 'fs/promises';
import { Server as SocketServer } from 'socket.io';
import path from 'path';
import chokidar from 'chokidar';
import pty from 'node-pty';
import generateFileTree from "./utilities/generate_file_tree.js";
import process from 'process';
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentWorkingDirectory = process.cwd();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ptyProcess = pty.spawn('/bin/sh',  [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: currentWorkingDirectory + '/user',
    env: {
        ...process.env,
        PS1: '', // Disable the shell prompt
    },
});

// console.log(currentWorkingDirectory)

// create a express app
const app = express();
const server = http.createServer(app);
const io = new SocketServer({
    cors: '*'
})
const PORT = process.env.PORT || 8002;

// Mapping ports to containers and vice versa
const PORT_TO_CONTAINER = new Map();   // '8000': container 1
const CONTAINER_TO_PORT = new Map();   // container 1: '8000'

// middleware - Plugins
app.use(cors());   
app.use(express.json());
app.use(logReqRes("log.txt"));
app.use(express.static(path.join(__dirname, 'build'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

// connect to database
connectToMongoDB();

io.attach(server);

chokidar.watch('./user').on('all', (event, path) => {
    io.emit('file:refresh', path)
});

ptyProcess.onData((data) => {
    // console.log(data)
    io.emit('terminal:data', data)
})

io.on('connection', (socket) => {
    console.log(`Socket connected`, socket.id)

    socket.emit('file:refresh')

    socket.on('file:change', async ({ path, content }) => {
        await fs.writeFile(`./user${path}`, content)
    })

    socket.on('terminal:write', (data) => {
        // console.log(data)
        ptyProcess.write(data+"\n"); 
    })
})



// ROUTES
import auth from "./routes/auth/auth.js"
import files from "./routes/files/user-file.js"
import docker_route from "./docker/index.js"
import testCode from "./testing/index.js";

app.get('/files', async (req, res) => {
    const fileTree = await generateFileTree('./user');
    return res.json({ tree: fileTree })
})

app.get('/files/content', async (req, res) => {
    const path = req.query.path;
    const content = await fs.readFile(`./user${path}`, 'utf-8')
    return res.json({ content })
})

// build apis
app.use("/api/auth",auth);
app.use("/api/files",files);
app.use("/api/docker",docker_route);

// testing apis 
app.use("/api/test-verify",testCode);

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

export {PORT_TO_CONTAINER, CONTAINER_TO_PORT};