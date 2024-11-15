import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGOURI;
const uri2 = "mongodb://localhost:27017/cloud_ide"; // url to atlas database i.e cloud ide 

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

// using async function
const connectToMongoDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(uri2);
        console.log("Connected to mongodb successfully");
    }
    catch (err) {
        console.log(err);
    }
}

export default connectToMongoDB;

// import { MongoClient, ServerApiVersion } from 'mongodb';
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const connectToMongoDB = async () => {

//     const client = new MongoClient(uri2, {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     });

//     async function run() {
//         try {
//             // Connect the client to the server	(optional starting in v4.7)
//             await client.connect();

//             // Send a ping to confirm a successful connection
//             const db = await client.db("cloud_ide")
//             await db.command({ ping: 1 });

//             const collection = db.collection("User_collection");
//             const count = await collection.countDocuments();

//             // Insert a document to ensure the database is created if does not exists 
//             if(count === 0) {
//                 await collection.insertOne({ name: "test" });  
//             }

//             console.log("Pinged your deployment. You successfully connected to MongoDB!");
            
//             // Accesses the admin functions on the client instance to list all databases directly.
//             // const databases = await client.db().admin().listDatabases();    
//             // console.log(databases.databases)
//         } finally {
//             // Ensures that the client will close when you finish/error
//             await client.close();
//         }
//     }
//     run().catch(console.dir)
// }
