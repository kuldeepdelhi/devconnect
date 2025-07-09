const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { verifyToken } = require("../middleware/auth");

// Create project
router.post("/", verifyToken, async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, userId: req.userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find().populate("userId", "name");
  res.json(projects);
});

// Get single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("userId", "name");
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: "Project not found" });
  }
});

// ✅ Get all projects by a specific user
router.get("/user/:id", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.id }).populate("userId", "name");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user's projects" });
  }
});

module.exports = router;
