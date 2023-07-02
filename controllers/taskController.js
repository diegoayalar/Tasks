const ObjectId = require("mongoose").Types.ObjectId;
const taskModel = require("../models/task");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createTask = asyncErrorHandler(async (req, res, next) => {
    try {
        const newTask = await taskModel.create(req.body);
        res.status(201).json({
            status: "sucess",
            data: {
                task: newTask,
            },
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = new CustomError(error.message, 422);
            return next(validationError);
        }
    }
});

exports.updateTask = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid Task ID", 400);
        return next(error);
    }

    try {
        const task = await taskModel.findByIdAndUpdate(id, req.body, {
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
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = new CustomError(error.message, 422);
            return next(validationError);
        }
    }
});

exports.deleteTask = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid Task ID", 400);
        return next(error);
    }

    const task = await taskModel.findByIdAndDelete(id);
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
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid Task ID", 400);
        return next(error);
    }

    const task = await taskModel.findById(id);
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

    res.status(200).json({
        status: "success",
        data: {
            tasks,
        },
    });
});
