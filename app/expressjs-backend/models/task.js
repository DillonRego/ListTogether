const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 1) throw new Error("Invalid Title.");
    }
  },
  items: {
    type: [String],
    required: true,
    validate(value) {
      if (value.length < 1) throw new Error("List cannot be empty.");
    }
  }
}, {collection : 'tasks_list'});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;