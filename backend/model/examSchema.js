const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examName: String,
  examTime: String,
  examDate: String,
});

const Exams = mongoose.model("Exams", examSchema);

module.exports = Exams;
