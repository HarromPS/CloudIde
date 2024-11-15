// so when '/api/auth' endpoint is hit
// we can do GET/POST/PUT/DELETE, etc requests usign Router of express from here './routes/auth.js'

// Syntax:
import express from "express";
import { handleCreateUser, handleUserLogin } from "../../controllers/authController.js";
const router = express.Router();

// Route 1:
// Create User

// .get(), .patch() are the handlers, called as controllers
router.post("/create-user",handleCreateUser);

// Route 2:
// Login the user 

router.post("/user-login",handleUserLogin);

export default router;