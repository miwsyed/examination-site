const Questions = require("../../model/questionsSchema");

exports.getQuestions = async (req, res) => {
  try {
    const allQuestions = await Questions.find();
    res.status(200).json(allQuestions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createQuestions = async (req, res) => {
  const question = req.body;

  const newQuestion = new Questions(question);

  try {
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
