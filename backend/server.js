const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const dbURI = process.env.URI;
const port = process.env.port || 5000;

mongoose.connect(dbURI, { useNewUrlParser: true }).then(() => {
  console.log("Connected to db");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

const taskRouter = require("./routes/taskRoutes");
app.use("/tasks", taskRouter);
