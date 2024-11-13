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

// user is having other requests, its time to verify user using his jwt token 
router.post("/verify-user",async(request,response)=>{
    try{
        // get the user token from request body here

        // note: get a sample token by requesting above endpoint for test
        const authToken = '';
        // verify the signature token here
        const isTrueToken = jwt.verify(authToken, jwt_secret);
        
        console.log(isTrueToken);
        // return the payload which was encrypted
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