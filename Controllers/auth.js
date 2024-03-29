require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const createUser = async (req, res) => {
  const { email, username, password, fullName } = req.body;
 
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);

  if (!email) {
    let success = false;
    return res.status(400).send({ success, error: "Email cannot be empty" });
  }
  if (!username) {
    let success = false;
    return res.status(400).send({ success, error: "Username cannot be empty" });
  }
  if (!password) {
    let success = false;
    return res.status(400).send({ success, error: "Password cannot be empty" });
  }

  if (!fullName) {
    let success = false;
    return res.status(400).send({ success, error: "FullName cannot be empty" });
  }

  

  const user = await User.create({
    username: username,
    email: email,
    fullName,
    password: secPass,
  });
  const data = {
    user: {
      id: user._id,
    },
  };

  const token = await jwt.sign(data, process.env.JWT_SECRET);
  return res.json({ token, success: "true" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ msg: "Please provide email and password properly" });
  }

  const user = await User.findOne({ email });
  if (user == null) {
    let success = false;
    return res
      .status(400)
      .send({ success, error: "Please provide proper email" });
  }
  const data = {
    user: {
      id: user._id,
    },
  };
  let success = false;

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    success = false;
    return res
      .status(400)
      .send({ success, error: "Please provide proper password" });
  }

  success = true;

  const token = await jwt.sign(data, process.env.JWT_SECRET);
  res.json({ token, success });
};

const getUser = async (req, res) => {
  let userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.json(user);
};

module.exports = {
  createUser,
  login,
  getUser,
};
