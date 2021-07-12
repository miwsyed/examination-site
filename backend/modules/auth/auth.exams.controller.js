const Exams = require("../../model/examSchema");

exports.getExams = async (req, res) => {
  try {
    const allExams = await Exams.find();
    res.status(200).json(allExams);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createExams = async (req, res) => {
  const exam = req.body;

  const newExam = new Exams(exam);

  try {
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
