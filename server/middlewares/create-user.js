import User from "../models/User.js";
import bcrypt from "bcryptjs";  // for password encryption
import { body, validationResult } from "express-validator";

const createUser = async (request, response, next)=>{
    // validator array for validation
    await body("username","Username must be at least 3 characters").isLength({min:3}).run(request);
    await body("email","Invalid email").isEmail().run(request);
    await body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation is incorrect');
        }
        return true; // Important to return true if validation passe
    }).run(request);

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
        // password hashing
        const salt = await bcrypt.getSalt(12);
        const secretPassword = await bcrypt.hash(request.body.password, salt);  

        // create a user 
        let result = false;
        let usr = await User.findOne({
          email:request.body.email
        });

        // if user already exists
        if(usr){
          return response.status(409).json({
            "success":result,
            "msg": "Email Already in Use"
          })
        }

        usr = await User.create({
          name: request.body.name,
          email: request.body.email,
          password: secretPassword
        });

        next();
    }
    catch(error){
        return response.status(500).json({
            "msg": "Internal Server Error"
          });
    }
}

export default createUser;