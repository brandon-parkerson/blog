const db = require("../db/queries");

exports.getIndex = (req, res) => {
  res.send("got index from controller");
};

exports.getRegister = (req, res) => {
  res.send("got register");
};

exports.getAllPosts = (req, res) => {
  res.send("get posts");
};

exports.getPost = (req, res) => {
  res.send("get post");
};
