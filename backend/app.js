const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const db = require("./db/queries");

app.use("/", usersRouter);
app.use("/register", usersRouter);
app.use("/login", usersRouter)
app.use("/posts", usersRouter);
app.use("/posts/:postId", usersRouter);
app.use("/publish", usersRouter);

db.allUsers();

app.listen(3000, () => {
  console.log("server running on port: 3000...");
});


