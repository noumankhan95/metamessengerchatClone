const express = require("express");
const http = require("http");
const cors = require("cors");
const socket = require("socket.io");
const SocketModel = require("../Models/Sockets.js")
const app = express();
const mongoose = require('mongoose')
app.use(cors());
const MessageModel = require("../Models/Messages.js")
const server = http.createServer(app);
const sortIds = require('../lib/sortIds.js')
const io = new socket.Server(server, {
  cors: {
    origin: true,
  },
});

io.on("connection", async (socket) => {
  try {
    console.log(`Connection established`, socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
    socket.on('setUserid', async (data, cb) => {
      try {

        const result = await SocketModel.findOneAndUpdate({ email: data.userId }, { $set: { socketId: data.socketId, email: data.userId } }, { upsert: true, new: true })
        console.log(result)
        cb("Success DOne")
        return
      } catch (e) {
        console.log(e)
      }
    })
    socket.on("chat-message", async (data) => {
      console.log(data, "data from chat ")
      const User = await SocketModel.findOne({ email: data.recepId })
      console.log(User, "data from User ")

      const recipientSocket = io.sockets.sockets[User.socketId]

      // Send the private message directly to the recipient
      const cid = sortIds(data.userId, data.recepId)
      // const result = await MessageModel.updateOne({ conversationId: cid }, { $push: { messages: { message: data.message } } }, { upsert: true, new: true })
      io.to(User.socketId).emit("chat-message", data.message);

    });

  } catch (e) {
    console.log(e)
  }

});
mongoose.connect("mongodb://127.0.0.1:27017/messengerApp").then(r => {
  server.listen(4000, async () => {
    console.log("Server running on http://localhost:4000");
  });

}).catch(e => console.log(e))

