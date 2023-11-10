import PatientModel from '../models/patient.js';
import UserModel from '../models/user.js';
import PresModel from '../models/prescription.js';
import HealthPackageModel from '../models/healthPackage.js';
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
  const doctorId = req.params.id;
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
        _id: object._id,
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
const getPatientHealthPackage = async (req, res) => {
  try {
    const patient = await PatientModel.findById(req.params.id);
    if (!patient) return res.status(404).send("patient not found");
    if (patient.healthPackageSub) {
      const hp = await HealthPackageModel.find({ name: patient.healthPackageSub });
      return res.status(200).send(hp);
    }
    res.status(200).send(null);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
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
  console.log("YARABBBBB")
  //retrieve patients that have an appointmen wth this dr from the database
  const doctorId = req.params.id;
  console.log(doctorId);

  const myPatients = [];
  try {
    const drAppointments = await AppointmentModel.find({ doctorId: doctorId });
    const patients = []
    console.log(drAppointments);
    for (const appointment1 of drAppointments) {

      let arrayOfPatient = await PatientModel.find({ _id: appointment1.patientId });
      let patient = arrayOfPatient[0];

      if (patients.length === 0 && appointment1.status === "upcoming")
        patients.push(patient);
      else {
        let found = false;
        for (let i = 0; i < patients.length; i++) {
          if ((patients[i]._id).equals(patient._id) && appointment1.status === "upcoming") {
            found = true;
            break;
          }
        }
        if (!found && appointment1.status === "upcoming") {
          patients.push(patient);
        }
      }

    }
    console.log(patients);
    // res.status(200).json(patients);
    const rows = patients.map((object) => {
      return {
        _id: object._id,
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

const getSessDiscount = async (req, res) => {
  try {
    //const patientID = req.params.id;
    const patientID = req.body.id;
    const patient = await PatientModel.findById(patientID);
    const subscribtion = patient.healthPackageSub;
    var discount = 0;
    if (subscribtion !== null && subscribtion !== "" && subscribtion !== " ") {
      const HealthPack = await HealthPackageModel.findOne({ "name": subscribtion });
      discount = HealthPack.sessDiscount;
    }
    res.status(200).send({ "discount": discount });
  } catch (e) {
    res.status(400).send(e);
  }
}

import FamilyMemberModel from "../models/familyMember.js"

// req.params -->  current user ID
//req.body --> email , relation 
const linkPatient= async (req, res)=>{
}
export default {
  createPatient,
  getPatients,
  getPatientHealthPackage,
  getMyPatients,
  getPatientByName,
  upcomingApp,
  getPrescriptions,
  filterPres,
  getPres,
  getSessDiscount,
  linkPatient
}