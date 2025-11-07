const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const cors = require("cors");
const bodyParser = require("body-parser");

// cors for frontend talking to backend while being on different ports
app.use(cors());
// receive form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", usersRouter);

app.listen(3000, () => {
  console.log("server running on port: 3000...");
});

// TODO: find author of comments on posts
