const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const cors = require("cors");
const bodyParser = require("body-parser");

// cors for frontend and backend being on different ports
app.use(cors());
// receive form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", usersRouter);
app.use("/api/register", usersRouter);
app.use("/api/login", usersRouter);
app.use("/api/posts", usersRouter);
app.use("/api/posts/:postId", usersRouter);
app.use("/api/publish", usersRouter);

app.listen(3000, () => {
  console.log("server running on port: 3000...");
});
