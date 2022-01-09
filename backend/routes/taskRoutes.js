const express = require("express");
const router = express.Router();
const Tasks = require("../models/tasks.model");

router.get("/", (req, res) => {
  Tasks.find()
    .sort({ createAt: -1 })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addTask", (req, res) => {
  const task = req.body;
  console.log(req.body);
  const newTask = Tasks(task);

  newTask
    .save()
    .then(() => {
      res.json("Task added successfully");
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Tasks.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Task deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
