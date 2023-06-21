const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
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
    enum: ["Open", "Closed"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
