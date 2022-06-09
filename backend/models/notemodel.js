const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add Title "],
      unique: true,
    },
    body: {
      type: String,
    },
    flag: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
noteSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Note", noteSchema);
