
// File: routes/comments.js
const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { verifyToken } = require("../middleware/auth");

// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const comment = await Comment.create({ ...req.body, userId: req.userId });
//     res.status(201).json(comment);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get("/project/:id", async (req, res) => {
//   const comments = await Comment.find({ projectId: req.params.id }).populate("userId", "name");
//   res.json(comments);
// });
router.post("/", verifyToken, async (req, res) => {
    try {
      const { projectId, text } = req.body;
      const comment = await Comment.create({
        projectId,
        userId: req.userId,
        text,
      });
      const populatedComment = await comment.populate("userId", "name");
      res.status(201).json(populatedComment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.get("/project/:projectId", async (req, res) => {
    const comments = await Comment.find({ projectId: req.params.projectId }).populate("userId", "name");
    res.json(comments);
  });

module.exports = router;