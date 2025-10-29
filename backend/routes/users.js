const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// get routes
router.get("/", userController.getIndex);
router.get("/register", userController.getRegister);
router.get("/posts", verifyToken, userController.getAllPosts);
router.get("/posts/:postId", verifyToken, userController.getPost);
router.get("/writer", verifyToken, userController.checkIfWriter);
router.get("/content", userController.getPost);

// post routes
router.post("/login", userController.login);
router.post("/publish", verifyToken, userController.publish);
router.post("/register", verifyToken, userController.addUser);
router.post("/writer", userController.postArticle);
function verifyToken(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers["authorization"];
  // check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
