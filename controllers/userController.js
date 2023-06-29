const ObjectId = require("mongoose").Types.ObjectId;
const userModel = require("../models/user");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, "2f6a2d411da7481afe8957820128da9c43e8469c0b89bce5ea2a1a056d128eb4", { expiresIn: "1h" });
    return token;
};

exports.signUp = asyncErrorHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = generateToken(newUser._id);

        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
                token,
            },
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = new CustomError(error.message, 422);
            return next(validationError);
        }
    }
});

exports.login = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            const error = new CustomError("Invalid email or password", 401);
            return next(error);
        }

        // Compare the provided password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            const error = new CustomError("Invalid email or password", 401);
            return next(error);
        }

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(200).json({
            status: "success",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
});

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
