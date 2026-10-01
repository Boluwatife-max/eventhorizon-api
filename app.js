require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 4567;


connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("EventHorizon API is running!");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});