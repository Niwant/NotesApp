const express = require("express");
const router = express.Router();

const {
  getNotes,
  postNotes,
  updateNotes,
  deleteNotes,
} = require("../controllers/noteControlller");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, postNotes);
router.route("/:id").put(protect, updateNotes).delete(protect, deleteNotes);

module.exports = router;
