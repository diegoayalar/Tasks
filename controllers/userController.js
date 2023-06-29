const ObjectId = require("mongoose").Types.ObjectId;
const userModel = require("../models/user");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createUser = asyncErrorHandler(async (req, res, next) => {
    try {
        const newUser = await userModel.create(req.body);
        res.status(201).json({
            status: "sucess",
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = new CustomError(error.message, 422);
            return next(validationError);
        }
    }
});

exports.updateUser = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid User ID", 400);
        return next(error);
    }

    try {
        const user = await userModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            const error = new CustomError("User not found", 404);
            return next(error);
        }
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = new CustomError(error.message, 422);
            return next(validationError);
        }
    }
});

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid User ID", 400);
        return next(error);
    }

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
        const error = new CustomError("User not found", 404);
        return next(error);
    }
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.getUser = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid User ID", 400);
        return next(error);
    }

    const user = await userModel.findById(id);
    if (!user) {
        const error = new CustomError("User not found", 404);
        return next(error);
    }
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.getUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await userModel.find();
    console.log(users);
    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});
