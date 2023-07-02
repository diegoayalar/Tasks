const express = require("express");
const taskController = require("../controllers/taskController");
const protectRoute = require("../middlewares/authMiddleware");

const router = express.Router();

router
    .route("/")
    .get(protectRoute, taskController.getTasks)
    .post(protectRoute, taskController.createTask);
router
    .route("/:id")
    .get(protectRoute, taskController.getTask)
    .put(protectRoute, taskController.updateTask)
    .delete(protectRoute, taskController.deleteTask);

module.exports = router;
