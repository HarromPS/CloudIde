import User from "../models/User.js";
import { body, validationResult,check } from "express-validator";

const verifyUser = async (request, response, next)=>{
    // user and password is verified from database here 
    await body("email","Invalid email").isEmail().run(request);
    await body("password", "Enter a password").exists().run(request);

    // check if all validations are passed 
    const errors = validationResult(request);

    // if empty, means valid
    if(!errors.isEmpty()){
        // bad request
        return response.status(400).json({
            error : errors.array()
        });
    }

    try{
        const {login_email, login_password} = request.body;

        // check if a user exists with this email 
        let usr = await User.findOne({
            email: login_email
        });

        if(!usr){    
            // no user exists 
            return response.status(404).json({
            "success":result,
            "msg": "User Not Found",
            });
        }

        // comparing passwords 
        let isCorrectPassword = await bcrypt.compare(login_password, usr.password);
        if(!isCorrectPassword){
            return response.status(401).json({
            "success":result,
            "msg": "Invalid Credentials",
            });
        }

        // passing user id to next function in a request-response cycle using response.locals property
        response.locals.Id = usr.id;
        next();
    }
    catch(error){
        return response.status(500).json({
            "msg": "Internal Server Error"
          });
    }
}

export default verifyUser;