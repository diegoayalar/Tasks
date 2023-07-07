const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
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
        enum: ["High", "Medium", "Low"],
        default: "Medium",
    },
    status: {
        type: String,
        enum: ["Open", "Closed"],
        required: [true, "Status is required"],
        default: "Open",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;
