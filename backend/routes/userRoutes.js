const express = require("express");
const {
  register,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router = express.Router();

router.post("/", register), router.post("/login", loginUser);
router.get("/me", protect, getUser);
router.put("/update", protect, updateUser);
router.delete("/delete", protect, deleteUser);

module.exports = router;
