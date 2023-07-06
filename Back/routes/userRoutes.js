const express = require("express");
const userController = require("../controllers/userController");
const protectRoute = require("../utils/authMiddleware");

const router = express.Router();

router.route("/signup").post(userController.signUp);
router.route("/login").post(userController.logIn);
router
    .route("/")
    .get(protectRoute, userController.getUsers)
    .post(protectRoute, userController.createUser);
router
    .route("/:id")
    .get(protectRoute, userController.getUser)
    .put(protectRoute, userController.updateUser)
    .delete(protectRoute, userController.deleteUser);

module.exports = router;
