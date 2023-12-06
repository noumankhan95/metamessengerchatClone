const mongoose = require("mongoose");

const Conversations = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Conversations: [{ ConvWith: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
}, { timestamps: true });

const ConversationsModel =
    mongoose.models.Conversations || mongoose.model("Conversations", Conversations);

module.exports = ConversationsModel;
