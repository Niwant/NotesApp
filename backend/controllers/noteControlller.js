const asyncHandler = require("express-async-handler");
const Note = require("../models/notemodel");
const User = require("../models/usermodel");
//
//
//

const getNotes = asyncHandler(async (req, res) => {
  const { page, searchTerm, tags } = req.query;

  const title = new RegExp(searchTerm, "i");
  const LIMIT = 8;
  const startIndex = (Number(page) - 1) * LIMIT;
  if (tags == "undefined") {
    searchTags = undefined;
  } else {
    searchTags = tags.split(",");
  }
  //const searchTags = unfilterTags.map((tag) => new RegExp(tag, "i"));
  console.log(title);
  console.log(searchTags);
  let total = 0;
  let notes = [];
  if (searchTags instanceof Array) {
    total = await Note.countDocuments({
      user: req.user,
      $or: [{ tags: { $in: searchTags } }],
    });

    notes = await Note.find({
      user: req.user,
      $or: [{ tags: { $in: searchTags } }],
      //$or: [{ tags: { $in: searchTags } }],
    })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
  } else {
    total = await Note.countDocuments({
      user: req.user,
      $or: [{ title }],
    });

    notes = await Note.find({
      user: req.user,
      $or: [{ title }],
      //$or: [{ tags: { $in: searchTags } }],
    })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
  }
  res.status(200).json({
    notes,
    currentPage: Number(page),
    numberofPages: Math.ceil(total / LIMIT),
  });
});

// const getNotesfromSearch = asyncHandler(async (req, res) => {
//   const { search } = req.query;
//   const title = new RegExp(search, "i");
//   const total = await Note.countDocuments({
//     user: req.user,
//     $or: [{ title }],
//   });
//   const notes = await Note.find({
//     user: req.user,
//     $or: [{ title }],
//   });

//   res.status(200).json(notes);
//});

const postNotes = asyncHandler(async (req, res) => {
  console.log("i was called");
  if (!req.body.title) {
    res.status(400);
    throw new Error("Enter Title for Note");
  }
  const [existingnote] = await Note.find({
    user: req.user,
    title: req.body.title,
  });

  if (existingnote) {
    res.status(400);
    throw new Error("Please change the title");
  }

  const note = await Note.create({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    flag: req.body.flag,
    user: req.user,
  });

  res.status(200).json(note);
});

const updateNotes = asyncHandler(async (req, res) => {
  console.log("updatenotes was called");
  const [note] = await Note.find({ _id: req.params.id, user: req.user.id });
  if (!note) {
    res.status(400);
    throw new Error("No Note with this Id is found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User Not found");
  }
  if (note.user.toString() !== req.user.id) {
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
  console.log(req.user.id);
  if (!req.user) {
    res.status(401);
    throw new Error("user not Found");
  }

  if (note.user.toString() !== req.user.id) {
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
