const projectModel = require("../models/project");

exports.createProject = async (req, res) => {
    try {
        const newProject = await projectModel.create(req.body);
        res.status(201).json({
            status: "sucess",
            data: {
                project: newProject,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await projectModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({
                status: "fail",
                message: "Project not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                project,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await projectModel.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({
                status: "fail",
                message: "Project not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                project,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                status: "fail",
                message: "Project not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                project,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        console.log(projects);
        res.status(200).json({
            status: "success",
            data: {
                projects,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};
