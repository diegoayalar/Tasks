const express = require("express");
const projectController = require("../controllers/projectController");
const protectRoute = require("../middlewares/authMiddleware");

const router = express.Router();

router
    .route("/")
    .get(protectRoute, projectController.getProjects)
    .post(protectRoute, projectController.createProject);
router
    .route("/:id")
    .get(protectRoute, projectController.getProject)
    .put(protectRoute, projectController.updateProject)
    .delete(protectRoute, projectController.deleteProject);

module.exports = router;
