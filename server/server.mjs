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

// middleware - Plugins
app.use(cors());   
app.use(express.json());
app.use(logReqRes("log.txt"));

// connect to database
connectToMongoDB();

// ROUTES
import auth from "./routes/auth/auth.js"
import testCode from "./testing/index.js";

// build apis
app.use("/api/auth",auth);

// testing apis 
app.use("/api/test-verify",testCode);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});