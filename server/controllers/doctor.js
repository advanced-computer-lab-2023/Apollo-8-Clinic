import DoctorModel from '../models/doctor.js';
import UserModel from '../models/user.js';
import AppointmentModel from '../models/appointment.js';
import PatientModel from '../models/patient.js';

const createDoctor = async (req, res) => {
  const {
    username,
    name,
    email,
    type,
    password,
    birthDate,
    hourlyRate,
    hospital,
    eduBackground,
    status,
  } = req.body;
  try {
    const user = new UserModel({ username, password, type });
    await user.save();
    console.log(user);
    const doctor = new DoctorModel({
      user: user._id,
      name,
      email,
      birthDate,
      hourlyRate,
      hospital,
      eduBackground,
      status,
    });
    await doctor.save();
    console.log(doctor);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
//handled in front end if somthing is not filledreturn previous thing
const updateDoctor = async (req, res) =>{
  try{
    const email=req.body.email.trim();
    const rate=req.body.hourlyRate;
    const hospital=req.body.hospital.trim();
    //temp until get it from session
    const doctorID=req.body.doctorID;
    const doctor = await DoctorModel.findById(doctorID)
    if(email && email!=="" && email.includes("@")){
      doctor.email=email;
    }
    if(hospital && hospital!==""){
      doctor.hospital=hospital;
    }
    if(rate && rate>0){
      doctor.hourlyRate=rate;
    }
    await doctor.save();
    res.status(200).json(doctor);
  }
  catch (error){
    res.status(400).json({ error: error.message })
  }
}

const getHealthRecord = async (req, res) => {
  try{
  const doctorID=req.body.doctorID;
  const patientID=req.body.patientID;  
  const appointment=AppointmentModel.findOne({doctorId:doctorID,patientId:patientID})
  if(appointment){
    const patient=PatientModel.findById(patientID)
    res.status(200).json(patient)
  }
  else{
    res.status(400).json({ error: "cannot look at that patient" })
  }
}catch(error) {
  res.status(400).json({ error: error.message })
}


}

export default {
  createDoctor,
  updateDoctor,
  getHealthRecord
}