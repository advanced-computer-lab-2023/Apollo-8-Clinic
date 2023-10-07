import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
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
  state: {
    type: String,
    required: true,
  },
});

const PrescriptionModel = mongoose.model("Prescription", prescriptionSchema);
export default PrescriptionModel;
