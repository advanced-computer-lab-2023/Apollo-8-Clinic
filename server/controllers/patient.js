import PatientModel from '../models/patient.js';
import UserModel from '../models/user.js';
import PresModel from '../models/prescription.js';
import DocModel from '../models/doctor.js';
import AppointmentModel from '../models/appointment.js';
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

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password is invalid' });
    }

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
        console.log(error)
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json("Username already exist");
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
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
  // const doctorId= "651fd81f02ac1ed6c024c967";
  const doctorId = req.query.id;
  console.log(req.query.id);
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
    if (patientsOfReqName.length === 0) {
      console.log("no patients with this name!");
      res.status(200).json("no patients with this name!")
    }
    else {
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
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};
const upcomingApp = async (req, res) => {
  //retrieve patients that have an appointmen wth this dr from the database
  const doctorId = req.query.id;
  // /const doctorId= "651fd81f02ac1ed6c024c967";
  console.log(req.query.id);
  console.log(doctorId);
  const myPatients = [];
  try {
    const drAppointments = await AppointmentModel.find({ doctorId: doctorId });
    const patients = []
    console.log(drAppointments);
    for (const appointment1 of drAppointments) {

      let arrayOfPatient = await PatientModel.find({ _id: appointment1.patientId });
      let patient = arrayOfPatient[0];

      if (patients.length === 0 && appointment1.status === "Upcoming")
        patients.push(patient);
      else {
        let found = false;
        for (let i = 0; i < patients.length; i++) {
          if ((patients[i]._id).equals(patient._id) && appointment1.status === "Upcoming") {
            found = true;
            break;
          }
        }
        if (!found && appointment1.status === "Upcoming") {
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
    console.log(req.query)
    const patientID = req.query.patientId;
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
    const presID = req.params.id
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