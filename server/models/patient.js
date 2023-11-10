import mongoose from "mongoose";


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
      unique: true,
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
      unique:true,
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
      required: true
    },
    health_records: {
      records: [
        {
          decription: { type: String },
          image_url: { type: String },
          date: { type: Date }
        }
      ]
    },
    healthPackageSub:{
      type:String,
      default:""
    },
    DateOfSubscribtion:{
      type:Date,
      required:false
    },
    subscriptionStatus:{
      type: String,
      enum: ["cancelled with end date", "subscribed with renewal date", "unsubscribed"],
    },
  },
  { timestamps: true }
);

const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;
