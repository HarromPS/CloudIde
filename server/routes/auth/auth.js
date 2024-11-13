// so when '/api/auth' endpoint is hit
// we can do GET/POST/PUT/DELETE, etc requests usign Router of express from here './routes/auth.js'

// Syntax:
import express from "express";
import jwt from "jsonwebtoken";     // js web tokens 
import verifyUser from "../../middlewares/verify-user.js";
import createUser from "../../middlewares/create-user.js";
import User from "../../models/User.js";
// import bcrypt from "bcryptjs";  // for password encryption
// import { body, validationResult,check } from "express-validator";
// import Generate_Session_Id from "../../utilities/generate_session_ids.js";
import dotenv from "dotenv";
dotenv.config();

// for unique token generation for user
let JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// Route 1:
// Create User

router.post("/create-user", createUser, async (request, response) => {
  // create a user then 
  try {
    // SEND AUTH TOKEN AFTER A USER IS LOGGED IN
    // // return user unique id instead of user 
    // let payload = {
    //   USER:{
    //     id:usr.id
    //   }
    // };

    // // sign token by admin
    // const authToken = jwt.sign(payload,JWT_SECRET);

    let result = true;
    return response.status(200).json({
      "success": result,
      "msg": "Account Created",
      // authToken: authToken
    });
  }
  catch (error) {
    return response.status(500).json({
      "msg": "Internal Server Error"
    });
  }
});

// Route 2:
// Login the user 

router.post("/user-login", verifyUser, async (request, response) => {
  try {
    // sign token using user id from mongodb database
    let payload = {
      USER: {
        id: response.locals.Id    // this is a local property of express framework
      }
    };

    // generate and send auth token
    const authToken = jwt.sign(payload, JWT_SECRET);
    return response.status(200).json({
      "msg": "Login Successful",
      authToken: authToken
    });
  }
  catch (err) {

  }
});

export default router;