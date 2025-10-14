const db = require("../db/queries");
const jwt = require("jsonwebtoken");

// get controllers
exports.getIndex = (req, res) => {
  res.send("got index from controller");
};

exports.getRegister = (req, res) => {
  res.send("got register");
};

exports.getAllPosts = (req, res) => {
  res.json({
    message: "getting all posts",
  });
};

exports.getPost = (req, res) => {
  res.send("get post");
};

// post controllers
exports.login = (req, res) => {
  // mock user
  const user = {
    id: 1,
    username: "brandon",
    email: "brandon@gmail.com",
  };
  jwt.sign({ user: user }, "secretkey", { expiresIn: "24h" }, (err, token) => {
    res.json({
      token,
    });
  });
};

exports.publish = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created",
        authData,
      });
    }
  });
};
