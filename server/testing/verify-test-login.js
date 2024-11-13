import express from "express";
import jwt from "jsonwebtoken";     // js web tokens 

const router = express.Router();

// lets say we have a user in data base 
let user = {
    name:'John',
    email:"john@mai.in",
    password:1234
}
let jwt_secret = 'abcd';

// a user is logged in and a jwt auth token is created
router.post("/login-a-user",async(request,response)=>{
    try{
        // user and password is verified from database here 

        // generate and send auth token 
        const authToken = jwt.sign(user, jwt_secret);
        return response.status(200).json({
            "msg":"Login Successful",
            authToken: authToken
        })
    }
    catch(err){
        return response.status(500).json({
            "msg": "Internal Server Error"
        });
    }
});

export default router;