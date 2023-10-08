import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const saltRounds=10;

const patientSchema = new mongoose.Schema(
  {
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
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    emergencyName: {
      type: String,
      required: true,
    },
    emergencyNo: {
      type: String,
      required: true,
    },
    emergencyRel: {
      type: String,
      required: true,
    },
    adresses: {
      type: [String],
    },
    wallet: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;
