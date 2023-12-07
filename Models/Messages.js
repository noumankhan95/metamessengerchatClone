const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    conversationId: { type: String, required: true },
    messages: [{ message: { type: String }, sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
}, { timestamps: true });

const MessageModel =
    mongoose.models.Message || mongoose.model("Message", Message);

module.exports = MessageModel;
