import express from "express";
import { 
    handleGetContainer, 
    handleCreateContainer, 
    handleDeleteContainer,
    handleExecuteCommands
} from "../controllers/docker-controller.js";
const router = express.Router();

// list all the containers running with async function
router.get("/containers",handleGetContainer);

// create containers
router.post("/create-container", handleCreateContainer);

// delete all containers 
router.delete("/delete-container", handleDeleteContainer);


// execute commands
router.post("/execute-commands",handleExecuteCommands);

export default router;