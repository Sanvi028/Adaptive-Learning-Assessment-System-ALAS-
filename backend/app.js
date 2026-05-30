const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://SanviProj1:%23win123@cluster0.lqmucow.mongodb.net/interviewDB?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(7000, () => console.log("Server started on port 7000"));