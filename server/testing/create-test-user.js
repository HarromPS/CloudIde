import express from "express";
import TestUser from "../models/testModels/test-user-models.js";

const router = express.Router();

// lets say we have a user in data base 

// user is having other requests, its time to verify user using his jwt token 
router.post("/create-test-user",async(request,response)=>{
    try{
        let usr = await TestUser.findOne({
            username:request.body.username
          });
  
          // if user already exists
          if(usr){
            return response.status(409).json({
              "success":result,
              "msg": "Username Already in Use"
            })
          }
  
          usr = await TestUser.create({
            username: request.body.username,
            password: request.body.password
          });
        return response.status(200).json({
            "msg":"Login Successful",
            "payload": isTrueToken
        });
    }
    catch(err){
        return response.status(500).json({
            "msg": "Internal Server Error"
        });
    }
});

export default router;