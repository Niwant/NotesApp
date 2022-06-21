const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add name"],
  },
  email: {
    type: String,
    required: [true, "please add email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please add password"],
  },
  tags: {
    type: [String],
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
