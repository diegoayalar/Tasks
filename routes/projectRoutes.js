const express = require("express");
const projectController = require("../controllers/projectController");
const protectRoute = require("../utils/authMiddleware");

const router = express.Router();

router
    .route("/")
    .get(protectRoute, projectController.getProjects)
    .post(protectRoute, projectController.createProject);

router.get("/user", protectRoute, projectController.getProjectsByUser);

router
    .route("/:id")
    .get(protectRoute, projectController.getProject)
    .put(protectRoute, projectController.updateProject)
    .delete(protectRoute, projectController.deleteProject);

module.exports = router;
