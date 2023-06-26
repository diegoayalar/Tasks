const userModel = require("../models/user");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createUser = asyncErrorHandler(async (req, res, next) => {
    const newUser = await userModel.create(req.body);
    res.status(201).json({
        status: "sucess",
        data: {
            user: newUser,
        },
    });
});

exports.updateUser = asyncErrorHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
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
});

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
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
    const user = await userModel.findById(req.params.id);
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
