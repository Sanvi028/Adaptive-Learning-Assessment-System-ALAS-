require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");


app.use(cors());
app.use(express.json());

//database connection
connectDB();

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});