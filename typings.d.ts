type User = {
  name: string;
  _id: string;
  socketId: string;
  password: string;
  email: string;
};

type Message = {
  messages: string;
};

type message = {
  _id: string;
  conversationId: string;
  messages: Array<Message>;
};
