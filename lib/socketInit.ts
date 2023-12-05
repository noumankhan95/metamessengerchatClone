import { io, Socket } from "socket.io-client";
type socket = Socket;
let Socketval: socket;
export const SocketInit = () => {
  console.log("socket io called");
  if (Socketval) {
    return Socketval;
  } else {
    Socketval = io("http://localhost:4000");
    return Socketval;
  }
};

export default Socketval!;
