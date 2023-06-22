const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    collaborators: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
});

const collaboratorModel = mongoose.model("Collaborator", collaboratorSchema);

module.exports = collaboratorModel;
