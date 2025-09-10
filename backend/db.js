const { MongoClient } = require("mongodb");

// MongoDB connection URI and database name
const uri = "mongodb://127.0.0.1:27017";
const dbName = "registerDB";

// Create a MongoClient instance
const client = new MongoClient(uri, { useUnifiedTopology: true });

let db;

// Function to connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("✅ MongoDB connected to", dbName);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if connection fails
  }
}

// Function to get the database instance
function getDB() {
  if (!db) {
    throw new Error("Database not connected. Please call connectDB first.");
  }
  return db;
}

module.exports = { connectDB, getDB };
