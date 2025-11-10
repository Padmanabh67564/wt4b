const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🟢 CREATE
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "✅ User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🟡 READ (get all users)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟠 UPDATE (by ID)
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "✅ User updated successfully", updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔴 DELETE (by ID)
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

