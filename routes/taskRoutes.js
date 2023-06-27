const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router
    .route("/")
    .get(projectController.getTasks)
    .post(projectController.createTask);
router
    .route("/:id")
    .get(projectController.getTask)
    .put(projectController.updateTask)
    .delete(projectController.deleteTask);

module.exports = router;
