const userModel = require("../models/user");

exports.createUser = async (req, res) => {
    try {
        const newUser = await userModel.create(req.body);
        res.status(201).json({
            status: "sucess",
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        //console.log(err)
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Invalid data sent",
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        console.log(users);
        res.status(200).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error,
        });
    }
};
