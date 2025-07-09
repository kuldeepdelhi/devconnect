const router = require("express").Router();
const User = require("../models/User");
const Project = require("../models/Project");

// /api/search?q=keyword
router.get("/", async (req, res) => {
  const q = req.query.q || "";
  const users = await User.find({ name: new RegExp(q, "i") }).select("name email");
  const projects = await Project.find({ title: new RegExp(q, "i") }).populate("userId", "name");
  res.json({ users, projects });
});

module.exports = router;
