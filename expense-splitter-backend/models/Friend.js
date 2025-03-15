// models/Friend.js
const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("Friend", FriendSchema);
