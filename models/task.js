const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name is required"],
        minlength: [1, "Name should be at least 1 character long"],
        maxlength: [100, "Name should not exceed 100 characters"],
    },
    description: {
        type: String,
        required: false,
        minlength: [1, "Description should be at least 1 character long"],
        maxlength: [100, "Description should not exceed 100 characters"],
    },
    dueDate: {
        type: Date,
        required: false,
    },
    priority: {
        type: String,
        enum: {
            values: ["High", "Medium", "Low"],
            message: "Priority must be either High, Medium, or Low",
        },
        default: "Medium",
    },
    status: {
        type: String,
        enum: {
            values: ["Pending", "InProgress", "Completed"],
            message: "Status must be either Pending, InProgress, or Completed",
        },
        default: "Pending",
        required: [true, "Status is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
