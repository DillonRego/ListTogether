const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 1) throw new Error("Invalid Task.");
    }
  },
  priority: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 1) throw new Error("Invalid Task.");
    }
  },
  status: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 1) throw new Error("Invalid Task.");
    }
  },
}, {collection : 'tasks_list'});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;