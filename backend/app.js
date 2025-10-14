const express = require("express");
const app = express();
const usersRouter = require("./routes/users");

app.use("/", usersRouter);
app.use("/register", usersRouter);
app.use("/posts", usersRouter);
app.use("/posts/:postId", usersRouter);

app.listen(3000, () => {
  console.log("server running on port: 3000...");
});
