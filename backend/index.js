import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import User from "./model/userSchema.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import authenticate from "./middleware/authentication.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

const CONNECTION_URL = process.env.DATABASE;
//////
//////
/////
/////

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));

//////
//////
/////
/////

//admin page
app.get("/adminserver", authenticate, (req, res) => {
  res.send(req.rootUser);
});

//////
//////
/////
/////
//////
//////
/////
///////////
//////
/////
/////

//Connection to Database collection
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else {
      const user = new User({ name, email, password });
      //hash the password here rest process done in userSchema.js
      await user.save();
    }

    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

//
//
//////
//////
/////
///////////
//////
/////
///////////
//////
/////
///////////
//////
/////
/////
//Login Check
app.post("/loginserver", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });

      if (isMatch) {
        res.json({ message: "user Login Sucessfully" });
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//////
//////
/////
/////
//////

app.get("/servervieweditstudents", authenticate, (req, res) => {
  res.send(req.rootUser);
});
//////
//////
/////
/////

app.get("/serveraddstudents", authenticate, (req, res) => {
  res.send("Hello From Add Students");
});
//////
//////
/////
/////
app.get("/servereditstudents/:id", authenticate, (req, res) => {
  res.send("Hello From Edit Students");
});
//////
//////
/////
/////

app.get("/serverviewstudents/:id", authenticate, (req, res) => {
  res.send("Hello From the View Students");
});
//////
//////
/////
/////

app.get("/serverupcomingexaminations", authenticate, (req, res) => {
  res.send("Hello From Upcoming examinations");
});
//////
//////
/////
/////

app.get("/serverviewupcomingexams/:id", authenticate, (req, res) => {
  res.send("Hello From View Upcoming examinations");
});
//////
//////
/////
/////

app.get("/serverviewquestion/:id", authenticate, (req, res) => {
  res.send("Hello From View Question");
});
//////
//////
/////
/////

app.get("/servereditquestion/:id", authenticate, (req, res) => {
  res.send("Hello From Edit Question");
});

/////////
//////
/////
//
app.get("/servereditupcomingexams/:id", authenticate, (req, res) => {
  res.send("Hello From Edit Question");
});

/////////
//////
/////
//

app.get("/serversetquestions", authenticate, (req, res) => {
  res.send("Hello From Edit Question");
});

/////
//logout

app.get("/logout", (req, res) => {
  console.log("Helo my logout page");
  return res.status(200).clearCookie("jwtoken").send("User Logout");
  // res.status(200).send("User Logout");
  // res.clearCookie("jwtoken", { path: "/" });
});
