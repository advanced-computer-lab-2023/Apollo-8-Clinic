import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum:["upcoming", "completed", "cancelled", "rescheduled"],
    required: true,
  },
  type: {
    type: String,
    enum: ["follow up", "regular"],
    required: true,
  },
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
export default AppointmentModel;
