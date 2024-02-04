const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const genereateAccessToken = (userID) => {
  return (token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  }));
};
const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = await new userModel({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });
    const sampleUser = await userModel.create(user);
    const token = genereateAccessToken(sampleUser._id);
    res.status(200).json({
      status: "success",
      data: sampleUser,
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      data: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ status: "invalid user" });

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).json({ status: "incorrect password" });

    const token = genereateAccessToken(user._id);
    return res.status(200).json({
      status: "login successful",
      data: user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: err.message,
    });
  }
};
module.exports = { register, login };
