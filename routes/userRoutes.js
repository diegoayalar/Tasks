const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(userController.signUp)
router.route("/login").post(userController.login)
router.route("/").get(userController.getUsers).post(userController.createUser);
router
    .route("/:id")
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
