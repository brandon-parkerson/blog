const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", userController.getIndex);
router.get("/register", userController.getRegister);
router.get("/posts", userController.getAllPosts);
router.get("/posts/:postId", userController.getPost);

module.exports = router;
