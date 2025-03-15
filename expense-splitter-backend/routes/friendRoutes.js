// routes/friendRoutes.js
const express = require("express");
const router = express.Router();
const Friend = require("../models/Friend");

router.get("/", async (req, res) => {
  const friends = await Friend.find();
  res.json(friends);
});

router.post("/", async (req, res) => {
  const newFriend = new Friend({ name: req.body.name });
  await newFriend.save();
  res.json(newFriend);
});

router.delete("/:id", async (req, res) => {
  await Friend.findByIdAndDelete(req.params.id);
  res.json({ message: "Friend removed" });
});

module.exports = router;
