import PatientModel from '../models/patient.js';
import UserModel from '../models/user.js';

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
const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find();
    console.log(patients);
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

export default {
  createPatient,getPatients
}