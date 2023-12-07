type User = {
  _id: string;
  name: string;
  password: string;
  email: string;
};

type Messages = {
  _id: string;
  createdAt: string;
  updateAt: string;
  conversationId: string;
  messages: Message[];
};

type Message = {
  _id: string;
  message: string;
  sender: string;
};

type UsersRespose = {
  status: Number;
  data: { docs: User[] };
};

type MessagesResponse = {
  status: Number;
  data: { docs: Messages };
};

type RecepsSocket = {
  userId: string;
  email?: string;
  socketId: string;
};
