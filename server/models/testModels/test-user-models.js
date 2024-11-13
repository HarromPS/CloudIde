// using mongoose a middle ware for mongodb and nodejs

import mongoose from "mongoose";
const {Schema} = mongoose;    // Destructure Schema directly from mongoose

// user schema
const TestUserSchema = new Schema(
    {
        username: {
            type:String,
            required: true
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        collection: "test-data" // collection name
    }   
);

const TestUser = mongoose.model('Test',TestUserSchema); // model name should be capitalized
// User.createIndexes();   // email as primary key

export default TestUser;