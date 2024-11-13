// using mongoose a middle ware for mongodb and nodejs

import mongoose from "mongoose";
const {Schema} = mongoose;    // Destructure Schema directly from mongoose

// user schema
const UserSchema = new Schema(
    {
        name: {
            type:String,
            required: true
        },

        email:{
            type:String,
            required: true,
            unique: true
        },

        password:{
            type:String,
            required:true
        },

        session_id: {
            type: String,
        },

        session_created:{
            type:Date,
            
        },
        session_expires:{
            type:Date,

        }
    },
    {
        collection: "user-data" // collection name
    }   
);

const User = mongoose.model('User',UserSchema); // model name should be capitalized
// User.createIndexes();   // email as primary key

export default User;