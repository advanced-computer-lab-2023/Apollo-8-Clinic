import mongoose from "mongoose";

const FamMemberSchema = new mongoose.Schema(
  {
    patientID:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"patient",
      required:true 
    },
    name: {
      type: String,
      required: true,
    },
    nationalID: {
      type: String,
      unique: true ,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    relation: {
      type: String,
      enum :["wife","husband","child"],
      required: true,
    },
  },
  
);

const FamilyMemberModel = mongoose.model("FamilyMember", FamMemberSchema);
export default FamilyMemberModel;
