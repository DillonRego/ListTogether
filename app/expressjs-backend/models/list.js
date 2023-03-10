const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
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
  },
  image: {
    type: String
  },
  userUuid: {
    type: String,
    required: true
  }
}, {collection : 'tasks_list'});

const List = mongoose.model("List", ListSchema);

module.exports = List;
