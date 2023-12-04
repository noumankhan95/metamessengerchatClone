import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const Usermodel = mongoose.models.User || mongoose.model("User", UserSchema);
export default Usermodel;
