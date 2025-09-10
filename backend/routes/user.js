const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

// Route to register a new user
router.post("/register", async (req, res) => {
  const { name, city, phone, email } = req.body;

  if (!name || !city || !phone || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = getDB();
    const result = await db.collection("users").insertOne({ name, city, phone, email });
    res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Route to delete a user by ID
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDB();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
