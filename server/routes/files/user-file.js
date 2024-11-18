// we can do GET/POST/PUT/DELETE, etc requests usign Router of express from here './routes/auth.js'

// Syntax:
import express from "express";
import {
    handleGetAllFiles,
    handleGetFileContents,
    handleWriteFileContents,
    handleCreateFile,
    handleDeleteFile
} from "../../controllers/file-controller.js";
const router = express.Router();

// Route 1:
// Create User

router.post("/create-file", handleCreateFile);
router.get('/allfiles', handleGetAllFiles)
router.get('/files-content', handleGetFileContents)
router.patch('/write-files-content', handleWriteFileContents)
router.delete('/delete-file', handleDeleteFile)

export default router;