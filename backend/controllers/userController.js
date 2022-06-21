const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Note = require("../models/notemodel");
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
      user: user.name,
      token: generatetoken(user.id),
      id: user._id,
      tags: user.tags,
    });
  } else {
    res.status(400);
    throw new Error("Invalis User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      user: user.name,
      token: generatetoken(user._id),
      id: user._id,
      tags: user.tags,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const updateUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("user not available");
  }
  const updatedUser = await User.findByIdAndUpdate(req.user, req.body, {
    new: true,
  });
  res.status(200).json({
    user: updatedUser.name,
    token: generatetoken(updatedUser._id),
    id: updatedUser._id,
    tags: updatedUser.tags,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("user not available");
  }

  await Note.deleteMany(req.user);
  await User.findByIdAndDelete(req.user);

  res.status(200).json({
    message: "user and notes are deleted",
  });
});

const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

module.exports = {
  register,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
