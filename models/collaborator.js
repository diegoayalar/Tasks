const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: true,
    },
    collaborators: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }],
});

const collaboratorModel = mongoose.model("collaborator", collaboratorSchema);

module.exports = collaboratorModel;
