const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [6, "Name should be at least 6 characters long"],
        maxLength: [20, "Name should not exceed 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email format is invalid"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password should be at least 8 characters long"],
        maxLength: [24, "Password should not exceed 24 characters"],
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
