const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, "title must be require"],
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    require: [true, "Status must be required"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = todoSchema;
