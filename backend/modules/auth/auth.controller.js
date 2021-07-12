const User = require("../../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
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
};
