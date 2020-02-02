// const session = require("express-session");
const express = require("express");
require("./db/connection");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
dotenv.config();

if (app.get("env") === "production") {
  sess.cookie.secure = true;
}

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server started on port  ${port}`);
});
