const db = require("../db/queries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// get controllers
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
exports.login = async (req, res) => {
  // mock user
  /* const user = {
    id: 1,
    username: "brandon",
    email: "brandon@gmail.com",
    isWriter: true,
  }; */
  // find user in db
  console.log(req.body.email);
  try {
    const user = await db.findUser(req.body.email);

    if (!user) {
      res.json({
        message: "email not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      res.json({
        message: "wrong password",
      });
    }
    jwt.sign(
      { user: user },
      "secretkey",
      { expiresIn: "24h" },
      (err, token) => {
        res.json({
          token,
        });
      }
    );

    res.json({
      message: "success",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
// sign the jwt to the user

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

  // redirect to login page
};
