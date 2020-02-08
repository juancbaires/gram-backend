// const session = require("express-session");
const express = require("express");
require("./db/connection");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comment");
if (app.get("env") === "production") {
  sess.cookie.secure = true;
}
dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cors allows you to make request to this server from browser and not have say, chrome block it
app.use(cors());
// these are the routes seperated by concerns
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.listen(port, () => {
  console.log(`Server started on port  ${port}`);
});
