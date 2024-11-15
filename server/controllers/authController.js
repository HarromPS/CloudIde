import User from "../models/User.js";
import jwt from "jsonwebtoken";     // js web tokens 
import bcrypt from "bcryptjs";  // for password encryption
import { body, validationResult } from "express-validator";
// import Generate_Session_Id from "../../utilities/generate_session_ids.js";
import dotenv from "dotenv";
dotenv.config();

// for unique token generation for user
let JWT_SECRET = process.env.JWT_SECRET;

const handleCreateUser = async (request, response) => {
    // validator array for validation
    await body("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters")
        .run(request);

    await body("email")
        .isEmail()
        .withMessage("Invalid email")
        .run(request);

    await body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation is incorrect');
        }
        return true; // Important to return true if validation pass
    }).run(request);

    // check if all validations are passed 
    const errors = validationResult(request);

    // if empty, means valid
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => ({
            field: err.param,
            message: err.msg
        }));
        return response.status(400).json({ errors: errorMessages });
    }

    try {
        // password hashing
        const salt = await bcrypt.genSalt(12);
        const secretPassword = await bcrypt.hash(request.body.password, salt);

        // create a user 
        let result = false;
        let usr = await User.findOne({
            email: request.body.email
        });

        // if user already exists
        if (usr) {
            return response.status(409).json({
                "success": result,
                "msg": "Email Already in Use"
            })
        }

        usr = await User.create({
            name: request.body.username,
            email: request.body.email,
            password: secretPassword
        });

        // SEND AUTH TOKEN AFTER A USER IS LOGGED IN
        // // return user unique id instead of user 
        // let payload = {
        //   USER:{
        //     id:usr.id
        //   }
        // };

        // // sign token by admin
        // const authToken = jwt.sign(payload,JWT_SECRET);

        result = true;
        return response.status(200).json({
            "success": result,
            "msg": "Account Created",
            // authToken: authToken
        });
    }
    catch (error) {
        return response.status(500).json({
            "msg": "Internal Server Error",
            "err": error
        });
    }
}

const handleUserLogin = async (request, response) => {
    // user and password is verified from database here 
    await body("login_email")
        .isEmail()
        .withMessage("Invalid email")
        .run(request);

    await body("login_password")
        .exists()
        .withMessage("Enter a password")
        .run(request);

    // check if all validations are passed 
    const errors = validationResult(request);

    // if empty, means valid
    if (!errors.isEmpty()) {
        // bad request
        const errorMessages = errors.array().map(err => ({
            field: err.param,
            message: err.msg
        }));
        return response.status(400).json({ errors: errorMessages });
    }

    try {
        const { login_email, login_password } = request.body;

        // check if a user exists with this email 
        let usr = await User.findOne({
            email: login_email
        });

        if (!usr) {
            // no user exists 
            return response.status(404).json({
                "success": result,
                "msg": "User Not Found",
            });
        }

        // comparing passwords 
        let isCorrectPassword = await bcrypt.compare(login_password, usr.password);
        if (!isCorrectPassword) {
            return response.status(401).json({
                "success": result,
                "msg": "Invalid Credentials",
            });
        }

        // sign token using user id from mongodb database
        let payload = {
            USER: {
                id: usr.id    // this is a local property of express framework
            }
        };

        // generate and send auth token
        const authToken = jwt.sign(payload, JWT_SECRET,{
            expiresIn: "2d"     // expires in 2 days
        });
        return response.status(200).json({
            "msg": "Login Successful",
            name: usr.name,
            email: usr.email,
            authToken: authToken
        });
    }
    catch (error) {
        return response.status(500).json({
            "msg": "Internal Server Error"
        });
    }
}

export { handleCreateUser, handleUserLogin };