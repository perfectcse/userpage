const express = require("express");
const cors = require("cors");
const app = express();

const { connectDB } = require("./db");  // Ensure this file exists and exports connectDB
const userRoutes = require("./routes/user"); // Ensure this file exists

app.use(cors());
app.use(express.json());

// Mount the routes
app.use("/api", userRoutes);

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("🚀 Server started at http://localhost:5000");
  });
}).catch((err) => {
  console.error("❌ Failed to connect to the database:", err);
});
