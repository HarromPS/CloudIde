import TestUser from "../models/testModels/test-user-models.js";

// lets say we have a user in data base 
let user = {
    name: 'John',
    email: "john@mai.in",
    password: 1234
}
let jwt_secret = 'abcd';

const handleCreateUser = async (request, response) => {
    try {
        let usr = await TestUser.findOne({
            username: request.body.username
        });

        // if user already exists
        if (usr) {
            return response.status(201).json({
                "success": result,
                "msg": "Username Already in Use"
            });
        }
        // create a new user 
        usr = await TestUser.create({
            username: request.body.username,
            password: request.body.password
        });

        return response.status(200).json({
            "msg": "Login Successful",
        });
    }
    catch (err) {
        return response.status(500).json({
            "msg": `Internal Server Error ${err}`
        });
    }
}

const handleHandleTestLogin = async (request, response) => {
    try {
        // user and password is verified from database here 

        // generate and send auth token 
        const authToken = jwt.sign(user, jwt_secret);
        return response.status(200).json({
            "msg": "Login Successful",
            authToken: authToken
        })
    }
    catch (err) {
        return response.status(500).json({
            "msg": "Internal Server Error"
        });
    }
}

const handleVerifyTestUser = async (request, response) => {
    try {
        // get the user token from request body here

        // note: get a sample token by requesting above endpoint for test
        const authToken = '';
        // verify the signature token here
        const isTrueToken = jwt.verify(authToken, jwt_secret);

        console.log(isTrueToken);
        // return the payload which was encrypted
        return response.status(200).json({
            "msg": "Login Successful",
            "payload": isTrueToken
        });
    }
    catch (err) {
        return response.status(500).json({
            "msg": "Internal Server Error"
        });
    }
}

const handleIncomingRequest = async (request, response) => {
    try {
        const body = request.body;
        return response.status(200).json({ body });
    } catch (error) {
        return response.status(500).json({ "error": "Internal Server Error" });
    }
}

export {handleCreateUser, handleHandleTestLogin, handleIncomingRequest, handleVerifyTestUser};