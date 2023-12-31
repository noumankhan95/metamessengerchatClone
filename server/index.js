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

// io.on("connection", async (socket) => {
//   try {
//     console.log(`Connection established`, socket.id);

//     socket.on("disconnect", () => {
//       console.log("user disconnected", socket.id);
//     });
//     socket.on('setUserid', async (data, cb) => {
//       try {

//         const result = await SocketModel.findOneAndUpdate({ email: data.userId }, { $set: { socketId: data.socketId, email: data.userId } }, { upsert: true, new: true })
//         console.log(result)
//         cb("Success DOne")
//         return
//       } catch (e) {
//         console.log(e)
//       }
//     })
//     socket.on("chat-message", async (data) => {
//       console.log(data, "data from chat ")
//       const User = await SocketModel.findOne({ email: data.recepId })
//       console.log(User, "data from User ")

//       const recipientSocket = io.sockets.sockets[User.socketId]

//       // Send the private message directly to the recipient
//       const cid = sortIds(data.userId, data.recepId)
//       // const result = await MessageModel.updateOne({ conversationId: cid }, { $push: { messages: { message: data.message } } }, { upsert: true, new: true })
//       io.to(User.socketId).emit("chat-message", data.message);

//     });

//   } catch (e) {
//     console.log(e)
//   }

// });
io.on("connection", async (socket) => {
  try {
    console.log(`Connection established`, socket.id);
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
    socket.on("new Message", async (data, ack) => {
      try {
        console.log("New Message Received", data)
        const recepSocketResult = await SocketModel.findOne({ userId: data.recepientSocket })
        const Messageres = await MessageModel.findOneAndUpdate({ conversationId: data.convId }, { $push: { messages: { message: data.message, sender: data.sender } } }, { upsert: true, new: true })
        console.log("rec", recepSocketResult)
        // console.log('mess', Messageres)
        ack("done")
        console.log(recepSocketResult.socketId, 'receps socket')
        io.to(recepSocketResult.socketId).emit("new Message", { message: data.message, sender: data.sender, _id: Messageres.messages[Messageres.messages.length - 1] })
      } catch (e) {
        console.log(e)
        ack("error")
      }
    })
  } catch (e) {
    console.log(e)
  }

});
mongoose.connect("mongodb://127.0.0.1:27017/messengerApp").then(r => {
  server.listen(4001, async () => {
    console.log("Server running on http://localhost:4001");
  });

}).catch(e => console.log(e))

