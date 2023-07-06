const ObjectId = require("mongoose").Types.ObjectId;
const userModel = require("../models/user");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 * @param {string} userId - The ID of the user.
 * @returns {string} JWT token.
 */
const generateToken = (userId) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET, // Access the JWT secret from the environment variable
        { expiresIn: process.env.JWT_EXPIRES_IN } // Access the JWT expiration from the environment variable
    );
    return token;
};

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with registered user and token.
 */
exports.signUp = asyncErrorHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const error = new CustomError("Email already exists", 422);
            return next(error);
        }

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
        next(error);
    }
});

/**
 * Authenticates a user and generates a JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with authenticated user and token.
 */
exports.logIn = asyncErrorHandler(async (req, res, next) => {
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

/**
 * Creates a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with created user.
 */
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

/**
 * Updates an existing user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with updated user.
 */
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

/**
 * Deletes an existing user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with deleted user.
 */
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

/**
 * Retrieves a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with retrieved user.
 */
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

/**
 * Retrieves all users from the user model.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with user data.
 */
exports.getUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await userModel.find();

    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});
