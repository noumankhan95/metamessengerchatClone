type User = {
  _id: string;
  name: string;
  password: string;
  email: string;
};

type Messages = {
  messages: Message[];
};

type Message = {
  _id: string;
  message: string;
};

type UsersRespose = {
  status: Number;
  data: { docs: User[] };
};

type MessagesResponse = {
  status: Number;
  data: { docs: Message[] };
};

type RecepsSocket = {
  userId: string;
  email?: string;
  socketId: string;
};
