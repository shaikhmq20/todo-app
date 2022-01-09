const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", taskSchema);
module.exports = Tasks;
