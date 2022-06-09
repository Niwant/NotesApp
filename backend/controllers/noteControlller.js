const asyncHandler = require("express-async-handler");
const Note = require("../models/notemodel");
const User = require("../models/usermodel");
//
//
//

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json(notes);
});

const postNotes = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Enter Title for Note");
  }
  const note = await Note.create({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    flag: req.body.flag,
    user: req.user.id,
  });

  res.status(200).json(note);
});

const updateNotes = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("No Note with this Id is found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User Not found");
  }
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user Not Authorized");
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedNote);
});

const deleteNotes = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("No Note with ID ");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not Authorized");
  }

  note.remove();

  res.status(200).json({
    message: `Deleted Note ${req.params.id}`,
  });
});

module.exports = {
  getNotes,
  postNotes,
  updateNotes,
  deleteNotes,
};
