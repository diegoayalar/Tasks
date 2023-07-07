const ObjectId = require("mongoose").Types.ObjectId;
const projectModel = require("../models/project");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createProject = asyncErrorHandler(async (req, res, next) => {
    try {
        const newProject = await projectModel.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                project: newProject,
            },
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = new CustomError(error.message, 422);
            return next(validationError);
        }
    }
});

exports.updateProject = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid Project ID", 400);
        return next(error);
    }

    try {
        const project = await projectModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            const error = new CustomError("Project not found", 404);
            return next(error);
        }
        res.status(200).json({
            status: "success",
            data: {
                project,
            },
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = new CustomError(error.message, 422);
            return next(validationError);
        }
    }
});

exports.deleteProject = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid Project ID", 400);
        return next(error);
    }

    const project = await projectModel.findByIdAndDelete(id);
    if (!project) {
        const error = new CustomError("Project not found", 404);
        return next(error);
    }
    res.status(200).json({
        status: "success",
        data: {
            project,
        },
    });
});

exports.getProject = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        const error = new CustomError("Invalid Project ID", 400);
        return next(error);
    }

    const project = await projectModel.findById(id);
    if (!project) {
        const error = new CustomError("Project not found", 404);
        return next(error);
    }
    res.status(200).json({
        status: "success",
        data: {
            project,
        },
    });
});

exports.getProjects = asyncErrorHandler(async (req, res, next) => {
    const projects = await projectModel.find();

    res.status(200).json({
        status: "success",
        data: {
            projects,
        },
    });
});

exports.getProjectsByUser = asyncErrorHandler(async (req, res, next) => {
    const createdBy = new ObjectId(req.query.createdBy)

    const projects = await projectModel.find({
        createdBy: createdBy
    });

    res.status(200).json({
        status: "success",
        data: {
            projects,
        },
    });
});
