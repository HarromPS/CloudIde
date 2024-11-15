import mongoose from "mongoose";
const { Schema } = mongoose;    // Destructure Schema directly from mongoose

// user schema
const TestUserSchema = new Schema(
    {
        author: {
            type: String,
            index: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        collection: "test_data" // collection name
    }   
);

// Create the model with a singular name
const TestUser = mongoose.model('TestUser', TestUserSchema); // Use 'TestUser' instead of 'test-data'

export default TestUser;
