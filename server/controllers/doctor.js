import DoctorModel from '../models/doctor.js';
import UserModel from '../models/user.js';

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
const getDoctors = async (req, res) => {
  try {
    const user = await DoctorModel.find();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getDoctorById= async (req, res) => {
  const { user } = req.body;
  try {
    const doctor = await DoctorModel.findOne({user });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default {
  createDoctor,getDoctorById,getDoctors
}