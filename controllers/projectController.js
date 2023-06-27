const projectModel = require("../models/project");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createProject = asyncErrorHandler(async (req, res, next) => {
    const newProject = await projectModel.create(req.body);
    res.status(201).json({
        status: "sucess",
        data: {
            project: newProject,
        },
    });
});

exports.updateProject = asyncErrorHandler(async (req, res, next) => {
    const project = await projectModel.findByIdAndUpdate(req.params.id, req.body, {
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
});

exports.deleteProject = asyncErrorHandler(async (req, res, next) => {
    const project = await projectModel.findByIdAndDelete(req.params.id);
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
    const project = await projectModel.findById(req.params.id);
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
    console.log(projects);
    res.status(200).json({
        status: "success",
        data: {
            projects,
        },
    });
});
