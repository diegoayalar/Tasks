const taskModel = require("../models/task");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createTask = asyncErrorHandler(async (req, res, next) => {
    const newTask = await taskModel.create(req.body);
    res.status(201).json({
        status: "sucess",
        data: {
            task: newTask,
        },
    });
});

exports.updateTask = asyncErrorHandler(async (req, res, next) => {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        const error = new CustomError("Task not found", 404);
        return next(error);
    }
    res.status(200).json({
        status: "success",
        data: {
            task,
        },
    });
});

exports.deleteTask = asyncErrorHandler(async (req, res, next) => {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    if (!task) {
        const error = new CustomError("Task not found", 404);
        return next(error);
    }
    res.status(200).json({
        status: "success",
        data: {
            task,
        },
    });
});

exports.getTask = asyncErrorHandler(async (req, res, next) => {
    const task = await taskModel.findById(req.params.id);
    if (!task) {
        const error = new CustomError("Task not found", 404);
        return next(error);
    }
    res.status(200).json({
        status: "success",
        data: {
            task,
        },
    });
});

exports.getTasks = asyncErrorHandler(async (req, res, next) => {
    const tasks = await taskModel.find();
    console.log(tasks);
    res.status(200).json({
        status: "success",
        data: {
            tasks,
        },
    });
});
