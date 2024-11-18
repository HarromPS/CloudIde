// import express 
import express from "express";
import cors from "cors";
import connectToMongoDB from "./database/database.mjs";
import logReqRes from "./middlewares/log-req-res.js";
import dotenv from "dotenv";
dotenv.config();

// create a express app
const app = express();
const PORT = process.env.PORT || 8002;

// Mapping ports to containers and vice versa
const PORT_TO_CONTAINER = new Map();   // '8000': container 1
const CONTAINER_TO_PORT = new Map();   // container 1: '8000'

// middleware - Plugins
app.use(cors());   
app.use(express.json());
app.use(logReqRes("log.txt"));

// connect to database
connectToMongoDB();

// ROUTES
import auth from "./routes/auth/auth.js"
import files from "./routes/files/user-file.js"
import docker_route from "./docker/index.js"
import testCode from "./testing/index.js";

// build apis
app.use("/api/auth",auth);
app.use("/api/files",files);
app.use("/api/docker",docker_route);

// testing apis 
app.use("/api/test-verify",testCode);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

export {PORT_TO_CONTAINER, CONTAINER_TO_PORT};