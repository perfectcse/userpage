const express = require("express");
const router = express.Router();
const { getDB } = require("../db");  


router.post("/register", async (req, res) => {
  const { name, city, phone, email } = req.body;

  try {
    const db = getDB();
    await db.collection("users").insertOne({ name, city, phone, email });
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});


router.get("/users", async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
