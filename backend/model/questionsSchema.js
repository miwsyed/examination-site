const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  answerOption: String,
});

const Questions = mongoose.model("questions", questionSchema);

module.exports = Questions;
