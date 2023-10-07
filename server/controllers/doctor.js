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

export default {
  createDoctor
}