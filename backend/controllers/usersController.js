const db = require("../db/queries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getIndex = (req, res) => {
  res.json({
    message: "got the flippin index",
  });
};

exports.getRegister = (req, res) => {
  res.json({
    message: "hit the getRegister controller",
  });
};

exports.getAllPosts = async (req, res) => {
  const posts = await db.getAllPosts();
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "got all posts",
        authData,
        posts,
      });
    }
  });
};

exports.getPost = async (req, res) => {
  // get post from db
  try {
    const id = req.get("id");
    const postId = Number(id);
    console.log(id);
    const post = await db.getPost(postId);
    res.json({
      post: post,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await db.findUser(req.body.email);
    console.log(user);
    console.log(user.id);
    if (!user) {
      return res.json({
        message: "email not found",
      });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.json({
          message: "wrong password",
        });
      } else {
        jwt.sign(
          { user: user },
          "secretkey",
          { expiresIn: "24h" },
          (err, token) => {
            res.json({
              token,
              message: "success",
              userId: user.id,
            });
          },
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
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

exports.addUser = async (req, res) => {
  // get data from form
  console.log(req.body.email);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // add data to db
    const email = req.body.email;
    const name = req.body.name;
    const password = hashedPassword;
    await db.createUser(name, email, password);
    res.json({ message: "user created successfully" });
  } catch {
    res.send("error creating user");
  }
};

exports.checkIfWriter = async (req, res) => {
  console.log("called check writer in controller");
  // find user
  try {
    const id = req.get("id");
    const intId = Number(id);
    const user = await db.findUserById(intId);
    if (!user) {
      console.log("user not found");
      res.json({ message: "User not found" });
    } else {
      const isWriter = user.writer;
      if (isWriter === false) {
        console.log("not a writer");
        res.json({
          message: "You do not have access",
        });
      } else if (isWriter === true) {
        console.log("is a writer");
        res.json({
          message: "Access Granted",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.postArticle = async (req, res) => {
  const title = req.body.title;
  const post = req.body.post;
  const id = req.body.id;
  const idInt = Number(id);

  try {
    db.addArticle(idInt, title, post);
    console.log("added article");
    res.json({
      message: "post success",
    });
  } catch (error) {
    console.log(error);
  }
  console.log(`${title}, ${post}`);
};

exports.postComment = async (req, res) => {
  const postId = req.body.postId;
  const comment = req.body.comment;
  try {
    await db.postComment(comment, postId);
    console.log("added comment");
    res.json({
      message: "comment post success",
    });
  } catch (error) {
    console.log(error);
  }
};
