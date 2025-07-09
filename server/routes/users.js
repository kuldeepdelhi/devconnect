
const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const query = req.query.q || "";
    const users = await User.find({ name: new RegExp(query, "i") });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;