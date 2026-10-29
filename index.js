
// Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import dns from "node:dns";

// Configure DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Load environment variables
dotenv.config();

// Initialize Express app and middleware
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const client = new MongoClient(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnzvkbf.mongodb.net/`
);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
}

await connectToMongoDB();

// Routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});



// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
