import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const saltRounds=10;
const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  eduBackground: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    required: true,
    default: "Pending",
  },
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);
export default DoctorModel;
