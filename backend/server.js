const express = require("express");
const cors = require("cors");
const app = express();

const { connectDB } = require("./db");  
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());


app.use("/api", userRoutes);


connectDB().then(() => {
  app.listen(5000, () => {
    console.log("🚀 Server started at http://localhost:5000");
  });
});
