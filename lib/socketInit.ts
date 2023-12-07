import { io, Socket } from "socket.io-client";

type SocketType = Socket | undefined;
let socketInstance: SocketType;
let socketInitPromise: Promise<SocketType> | undefined;

export const getSocketInstance = (): Promise<SocketType> => {
  if (socketInstance && socketInstance.connected) {
    return Promise.resolve(socketInstance);
  }

  // If initialization is in progress, wait for it to complete.
  if (socketInitPromise) {
    return socketInitPromise;
  }

  // Otherwise, start the initialization process.
  socketInitPromise = new Promise((resolve) => {
    const socket = io("http://localhost:4001", { autoConnect: false });

    socket.connect();

    socket.on("connect", () => {
      socketInstance = socket;
      socketInitPromise = undefined; // Reset the promise when initialization is complete.
      resolve(socketInstance);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });

  return socketInitPromise;
};

export const initializeSocket = (): Promise<SocketType> => {
  // Simply call getSocketInstance to ensure consistent behavior.
  return getSocketInstance();
};
