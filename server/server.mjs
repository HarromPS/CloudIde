// import express 
import express from "express";
import cors from "cors";
import connectToMongoDB from "./database/database.mjs";
import dotenv from "dotenv";
dotenv.config();

// create a express app
const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());   
app.use(express.json());

// connect to database
connectToMongoDB();

// ROUTES
import auth from "./routes/auth/auth.js"
import {testRequestBody, testVerifyUser, testVerifyLogin,testCreateUser} from "./testing/index.js";

// build apis
app.use("/api/auth",auth);

// testing apis 
app.use("/api/test-verify",testVerifyUser);
app.use("/api/test-verify",testVerifyLogin);
app.use("/api/test-verify",testRequestBody);
app.use("/api/test-create-user",testCreateUser);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});