const db = require("../db/queries");
const jwt = require("jsonwebtoken");

// get controllers
exports.getIndex = (req, res) => {
  res.json({
    message: "got the flippin index"
  });
};

exports.getRegister = (req, res) => {
  res.send("got register");
};

exports.getAllPosts = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "got all posts",
        authData,
      });
    }
  });
};

exports.getPost = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "got single post",
        authData,
      });
    }
  });
};

// post controllers
exports.login = (req, res) => {
  // mock user
  const user = {
    id: 1,
    username: "brandon",
    email: "brandon@gmail.com",
    isWriter: true,
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
    } else if (authData.user.isWriter === true) {
      res.json({
        message: "got to publishing page",
        authData,
      });
    } else {
      res.json({
        message: "not allowed in here",
      });
    }
  });
};
