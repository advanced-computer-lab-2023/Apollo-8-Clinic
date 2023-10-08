import PatientModel from '../models/patient.js';
import UserModel from '../models/user.js';
import PresModel from '../models/prescription.js';
import DocModel from '../models/doctor.js';
import bcrypt from "bcrypt";
const saltRounds = 10;

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
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    try {
      const user = new UserModel({ username, password, type });
      user.password = hashedPassword;
      console.log(user.password);
      console.log(req.body);

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
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("Username already exist");
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
const getMyPatients = async (req, res) => {
  //retrieve patients that have an appointmen wth this dr from the database
  const { doctorId } = req.body;
  console.log(req.body);
  const myPatients = [];
  try {
    const drAppointments = await AppointmentModel.find({ doctorId: doctorId });
    const patients = []
    for (const appointment1 of drAppointments) {

      let arrayOfPatient = await PatientModel.find({ _id: appointment1.patientId });
      let patient = arrayOfPatient[0];

      if (patients.length === 0)
        patients.push(patient);
      else {
        let found = false;
        for (let i = 0; i < patients.length; i++) {
          if ((patients[i]._id).equals(patient._id)) {
            found = true;
            break;
          }
        }
        if (!found) {
          patients.push(patient);
        }
      }

    }
    console.log(patients);
    // res.status(200).json(patients);
    const rows = patients.map((object) => {
      return {
        name: object.name,
        email: object.email,
        birthDate: object.birthDate,
        gender: object.gender,
        phone: object.phone,
        emergencyName: object.emergencyName,
        emergencyNo: object.emergencyNo,
        emergencyRel: object.emergencyRel
      };
    });
    console.log(rows);
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};
const getPatientByName = async (req, res) => {
  const { doctorId, patientName } = req.body;
  console.log(req.body);
  try {

    const drAppointments = await AppointmentModel.find({ doctorId: doctorId });
    const patients = []
    for (const appointment1 of drAppointments) {

      let arrayOfPatient = await PatientModel.find({ _id: appointment1.patientId });
      let patient = arrayOfPatient[0];

      if (patients.length === 0)
        patients.push(patient);
      else {
        let found = false;
        for (let i = 0; i < patients.length; i++) {
          if ((patients[i]._id).equals(patient._id)) {
            found = true;
            break;
          }
        }
        if (!found) {
          patients.push(patient);
        }
      }

    }
    const patientsOfReqName = patients.filter(object => object.name.toLowerCase() === patientName.toLowerCase());
    const patientsReqDetails = patientsOfReqName.map((object) => {
      return {
        name: object.name,
        email: object.email,
        birthDate: object.birthDate,
        gender: object.gender,
        phone: object.phone,
        emergencyName: object.emergencyName,
        emergencyNo: object.emergencyNo,
        emergencyRel: object.emergencyRel
      };
    });
    console.log(patientsReqDetails);
    res.status(200).json(patientsReqDetails)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};
const upcomingApp = async (req, res) => {
  //retrieve patients that have an appointmen wth this dr from the database
  const { doctorId } = req.body;
  console.log(req.body);
  const myPatients = [];
  try {
    const drAppointments = await AppointmentModel.find({ doctorId: doctorId } && { status: "Upcoming" });
    const patients = []
    console.log(drAppointments);
    for (const appointment1 of drAppointments) {

      let arrayOfPatient = await PatientModel.find({ _id: appointment1.patientId });
      let patient = arrayOfPatient[0];

      if (patients.length === 0)
        patients.push(patient);
      else {
        let found = false;
        for (let i = 0; i < patients.length; i++) {
          if ((patients[i]._id).equals(patient._id)) {
            found = true;
            break;
          }
        }
        if (!found) {
          patients.push(patient);
        }
      }

    }
    console.log(patients);
    // res.status(200).json(patients);
    const rows = patients.map((object) => {
      return {
        name: object.name,
        email: object.email,
        birthDate: object.birthDate,
        gender: object.gender,
        phone: object.phone,
        emergencyName: object.emergencyName,
        emergencyNo: object.emergencyNo,
        emergencyRel: object.emergencyRel
      };
    });
    console.log(rows);
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const patientID = req.body.patientId;
    const arr = await PresModel.find({ patientId: patientID }).populate('doctorId');
    console.log(arr);
    res.status(200).json(arr);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};
//searching by the name of the doctor take care of the is it oring or anding
const filterPres = async (req, res) => {
  try {

    const doctorName = req.body.doctorName;
    const doctor = await DocModel.findOne({ name: doctorName })
    const date = req.body.date;
    console.log(doctor);
    const state = req.body.state;
    const patientId = req.body.patientId;
    if (doctor !== null) {
      const arr = await PresModel.find({
        $or: [
          { doctorId: doctor._id }
        ], patientId: patientId
      }).populate('doctorId')
      res.status(200).json(arr);
    }
    else {
      const arr = await PresModel.find({
        $or: [
          { date: date },
          { state: state }
        ], patientId: patientId
      }).populate('doctorId')
      res.status(200).json(arr);
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getPres = async (req, res) => {
  try {
    const presID = req.body.perscriptionsID
    const perscription = await PresModel.findById(presID)
    res.status(200).json(perscription);
  } catch {
    res.status(400).json({ error: error.message })
  }

}

export default {
  createPatient,
  getPatients,
  getMyPatients,
  getPatientByName,
  upcomingApp,
  getPrescriptions,
  filterPres,
  getPres
}