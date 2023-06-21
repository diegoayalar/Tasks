const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["Pending", "InProgress", "Completed"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;