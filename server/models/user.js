import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,

  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Patient', 'Admin', 'Doctor'],
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
