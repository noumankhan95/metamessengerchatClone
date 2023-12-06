const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    conversationId: { type: String, required: true },
    messages: [{ message: { type: String } }],
}, { timestamps: true });

const MessageModel =
    mongoose.models.Message || mongoose.model("Sockets", Message);

module.exports = MessageModel;
