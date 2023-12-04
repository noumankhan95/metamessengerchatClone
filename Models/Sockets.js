const mongoose = require("mongoose");

const SocketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: String },
  socketId: { type: String },
});

const socketModel =
  mongoose.models.Sockets || mongoose.model("Sockets", SocketSchema);

module.exports = socketModel;
