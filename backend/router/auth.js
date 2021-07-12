const express = require("express");
const router = new express.Router();
const User = require("../model/userSchema");
const authenticate = require("../middleware/authentication.js");
const authController = require("../modules/auth/auth.controller");
const {
  getQuestions,
  createQuestions,
} = require("../modules/auth/auth.questions.controller");
const {
  getExams,
  createExams,
} = require("../modules/auth/auth.exams.controller");
const { getUsers } = require("../modules/auth/auth.controller.users");

router.get("/adminserver", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/register", authController.register);

router.post("/loginserver", authController.login);

//
//Questions

router.get("/serversetquestions", authenticate, getQuestions);

router.post("/serversetquestions", authenticate, createQuestions);

///////
/////
///

// Exams
router.post("/servercreateexam", authenticate, createExams);

router.get("/serverupcomingexaminations", authenticate, getExams);

///////
/////
///
//
router.get("/serverviewstudents", authenticate, getUsers);

////
///
//
router.get("/servervieweditstudents", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/serveraddstudents", authenticate, (req, res) => {
  res.send("Hello From Add Students");
});

router.get("/servereditstudents/:id", authenticate, (req, res) => {
  res.send("Hello From Edit Students");
});

router.get("/serverviewstudents/:id", authenticate, (req, res) => {
  res.send("Hello From the View Students");
});

router.get("/serverviewupcomingexams/:id", authenticate, (req, res) => {
  res.send("Hello From View Upcoming examinations");
});

router.get("/serverviewquestion/:id", authenticate, (req, res) => {
  res.send("Hello From View Question");
});

router.get("/servereditquestion/:id", authenticate, (req, res) => {
  res.send("Hello From Server Edit questions Id");
});

router.get("/servereditupcomingexams/:id", authenticate, (req, res) => {
  res.send("Hello From server edit upcoming exams : id");
});

router.get("/logout", (req, res) => {
  console.log("Helo my logout page");
  return res.status(200).clearCookie("jwtoken").send("User Logout");
});

module.exports = router;
