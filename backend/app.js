const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const cors = require("cors");

// cors for frontend and backend being on different ports
app.use(cors());

app.use("/", usersRouter);
app.use("/register", usersRouter);
app.use("/login", usersRouter);
app.use("/posts", usersRouter);
app.use("/posts/:postId", usersRouter);
app.use("/publish", usersRouter);

app.listen(3000, () => {
  console.log("server running on port: 3000...");
});
