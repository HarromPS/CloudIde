import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from 'process';
dotenv.config();

// create a express app
const app = express();
const PORT = 8003;

// middleware - Plugins
app.use(cors());   
app.use(express.json());

app.get('/', async (req, res) => {
    return res.json({message:"Hello from server"});
})

app.listen(PORT,()=>{   
    console.log(`Server running on port ${PORT}`);
});
