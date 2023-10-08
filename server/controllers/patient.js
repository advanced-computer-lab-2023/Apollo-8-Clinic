import PatientModel from '../models/patient.js';
import UserModel from '../models/user.js';
import PresModel from '../models/prescription.js';
import DocModel from '../models/doctor.js';

const createPatient = async (req, res) => {
  const {
    username,
    name,
    type,
    email,
    password,
    birthDate,
    gender,
    phone,
    emergencyName,
    emergencyNo,
    emergencyRel,
    adresses,
    status,
  } = req.body;
  console.log(req.body)
  try {
    const user = new UserModel({ username, password, type });
    await user.save();
    console.log(user);
    const patient = new PatientModel({
      user: user._id,
      name,
      email,
      birthDate,
      gender,
      phone,
      emergencyName,
      emergencyNo,
      emergencyRel,
      adresses,
      status,
    });
    await patient.save();
    console.log(patient);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getPrescriptions = async (req, res)=>{
  try{
    const patientID=req.body.patientId;
    const arr = await PresModel.find({patientId:patientID}).populate('doctorId');
    console.log(arr);
    res.status(200).json(arr);
  }catch(error){
    res.status(400).json({ error: error.message })
  }

};
//searching by the name of the doctor take care of the is it oring or anding
const filterPres = async (req, res)=>{
  try{
    
    const doctorName=req.body.doctorName;
    const doctor=await DocModel.findOne({name:doctorName})
    const date=req.body.date;
    console.log(doctor);
    const state=req.body.state;
    const patientId=req.body.patientId;
    if(doctor!==null){
      const arr = await PresModel.find({$or: [
        { doctorId: doctor._id }
      ],patientId:patientId}).populate('doctorId')
      res.status(200).json(arr);
    }
    else{
    const arr = await PresModel.find({$or: [
      { date: date },
      {state:state}
    ],patientId:patientId}).populate('doctorId')
    res.status(200).json(arr);
  }
  }catch(error){
    res.status(400).json({ error: error.message })
  }
};

const getPres = async (req, res)=>{
  try{
    const presID=req.body.perscriptionsID
    const perscription= await PresModel.findById(presID)
    res.status(200).json(perscription);
  }catch{
    res.status(400).json({ error: error.message })
  }

}

export default {
  createPatient,
  getPrescriptions,
  filterPres,
  getPres
}