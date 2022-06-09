const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//
//
//
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please add All fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPass,
  });
  if (user) {
    res.status(201).json({
      userid: user.name,
      token: generatetoken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalis User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      user: user.name,
      token: generatetoken(user.userid),
    });
  } else {
    register.status(400);
    throw new Error("Invalid Credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id, name } = await User.findById(req.user.id);
  res.status(200).json({
    id: id,
    name,
  });
});

const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  register,
  loginUser,
  getUser,
};
