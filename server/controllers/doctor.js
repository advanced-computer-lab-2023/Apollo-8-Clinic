import DoctorModel from '../models/doctor.js';
import UserModel from '../models/user.js';
import AppointmentModel from '../models/appointment.js';
import PatientModel from '../models/patient.js';
import bcrypt from "bcrypt";
const saltRounds = 10;

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
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    try {
      const user = new UserModel({ username, password, type });
      user.password = hashedPassword;
      console.log(user.password);
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
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("Username already exist");
  }
};
const getDoctors = async (req, res) => {
  try {
    const user = await DoctorModel.find();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getDoctorById = async (req, res) => {
  const { user } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ user });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
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
  createDoctor, getDoctorById, getDoctors,  createDoctor,
  updateDoctor,
  getHealthRecord
}