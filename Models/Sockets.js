const mongoose = require("mongoose");

const SocketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: String },
  socketId: { type: String },
});

const socketModel =
  mongoose.models?.Socket || mongoose.model("Socket", SocketSchema);

module.exports = socketModel;
