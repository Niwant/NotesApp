const express = require("express");
const {
  register,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router = express.Router();

router.post("/", register), router.post("/login", loginUser);
router.get("/me", protect, getUser);

module.exports = router;
