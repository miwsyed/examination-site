const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const app = express();
const CONNECTION_URL = process.env.DATABASE;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(CONNECTION_URL, mongoOptions, () => {
  console.log("connected to db");
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(require("./router/auth.js"));

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
