const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");

require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const postRoutes = require("./routes/postRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use(mongoSanitize());
app.use(helmet());
app.use(morgan("dev"));

app.use(authRoutes);
app.use(postRoutes);

try {
  mongoose
    .connect("mongodb://127.0.0.1:27017/blog")
    .then(() => {
      console.log("mongoose connected");
      app.listen(process.env.PORT || 5500);
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log(err);
}
