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
    wallet,
    health_records,
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
          wallet,
          health_records
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
  const doc=await DocModel.findOne({user:res.locals.userId})
  const doctorId = doc._id;
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
  const doc=await DocModel.findOne({user:res.locals.userId})
  const doctorId = doc._id;
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

// const PayAppointmentByWallet = async (req, res) => {
//   try {
//     const patientID = req.body.id;
//     const discount = await getSessDiscount(patientID);
//     const sessionPrice = 200;
//     const discountedAmount = (discount / 100) * sessionPrice;
//     const patient = await PatientModel.findById(patientID);
//     if (!patient) {
//       throw new Error('Patient not found');
//     }
//     patient.wallet -= discountedAmount;
//     await patient.save();

//     res.status(200).send({ "discount": discount, "deductedAmount": discountedAmount });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// }

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


const updateWallet = async (req, res) => {
  try {
    const { patientId, paymentAmount } = req.body;
    const patient = await PatientModel.findById(patientId);
    console.log(patient);
    patient.wallet += paymentAmount;
    const updatedPatient = await patient.save();
    res.status(200).json({ updatedWallet: updatedPatient.wallet });
  } catch (error) {
    console.error('Error updating wallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

import FamilyMemberModel from "../models/familyMember.js"

// req.params -->  current user ID
//req.body --> email , relation 
const linkPatient = async (req, res) => {

  try {
    const mailORnumber = req.body.input;
    let patient1 = "";
    var number = Number(mailORnumber);
    if (!isNaN(number)) {
      //Input is a number
      patient1 = await PatientModel.findOne({ "phone": number });
    } else {
      //Input is an email
      patient1 = await PatientModel.findOne({ "email": mailORnumber });
    }
    if (patient1 === null) { res.status(200).send("incorrect email or number , patient not found"); return; }

    console.log(patient1);
    const patientID = req.params.patientID;
    const rel = req.body.relation;
    //const patient1 = await PatientModel.findOne({"email": mail });
    const age = (new Date()).getFullYear() - patient1.birthDate.getFullYear() + 1;
    const newFamMember = new FamilyMemberModel({ "patientID": patientID, "name": patient1.name, "age": age, "gender": patient1.gender, "relation": rel, "linkageID": patient1._id, "healthPackageSub": "", "DateOfSubscribtion": null, "subscriptionStatus": "unsubscribed" });
    newFamMember.save();
    res.status(200).send("Added Successfully");
    console.log(newFamMember);

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

// req.params --> current user ID
//req.body --> number , relation 
// const linkPatientByNumber= async (req, res)=>{
//   try{  
//     const no = req.body.number;
//     const patientID = req.params.patientID ;
//     const rel = req.body.relation ;
//     const patient1 = await PatientModel.findOne({"phone": no });
//     const age = (new Date()).getFullYear() - patient1.birthDate.getFullYear()+1;
//     const newFamMember = new FamilyMemberModel({"patientID":patientID, "name":patient1.name , "age":age , "gender":patient1.gender,"relation":rel,"linkageID":patient1._id });
//     await newFamMember.save();
//     //res.status(200).send(" "+ (new Date()).getFullYear() +"-"+ patient1.birthDate.getFullYear() +" = "+age);
//     res.status(200).json(newFamMember);
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//     }

// }

// NEED TO update healthpackage subsc. if it is expired (duration 1 year)
// let subDate = patient1.DateOfSubscribtion ;
//   let currentDate = new Date();
//   let differenceInTime = currentDate.getTime() - subDate.getTime();
//   let differenceInDays = differenceInTime / (1000 * 3600 * 24);

// if(differenceInDays > 365){
//     //the subscribtion has expired , remove it and display a message for the patient
// }else{

// }

//req.params --> patientID
const patientDetails = async (req, res) => {
  try {
    const patientID = req.params.patientID;
    const patient1 = await PatientModel.findById(patientID);
    console.log(patient1);
    res.status(200).json(patient1);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//req.params --> id
const cancelSubscription = async (req, res) => {
  try {
    const patientID = req.params.id;
    const patient1 = await PatientModel.findById(patientID);
    if (patient1.healthPackageSub === "") {
      res.status(200).send("you are not subscribed to any Health Package");
      return;
    }
    patient1.subscriptionStatus = "cancelled with end date";
    patient1.save();
    res.status(200).send("Done");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const checkIfLinked =async (req,res)=>{
try{
  const patientID = req.params.id;
  const member1 = await FamilyMemberModel.findOne({"linkageID" : patientID});
  if(!member1) return ;
  const parentID = member1.patientID ;
  const parent = await PatientModel.findById(parentID);
  console.log("my parent patient that i am linked to"+parent);
  if(!parent){console.log("wrong linkage id , no patient with this id asln") ;return; };
  const hp = await HealthPackageModel.find({"name":parent.healthPackageSub});
  if(!hp){console.log("wrong hp name , no hp with that name") ;return; };
  //console.log("hp "+hp + hp[0].subDiscount);
  res.status(200).json(hp[0].subDiscount);
}catch(error){
  res.status(400).send(error);
}
}



const unsubscribe = async (req, res) => {
  try {

    const patientID = req.params.id;
    const patient1 = await PatientModel.findById(patientID);
    console.log("MY CONSOLE FOR UNSUBSCRIBE FOR ME" + patient1);
    if (patient1.healthPackageSub === "") {
      res.status(200).send("you are not subscribed to any Health Package");
      return;
    }
    if (patient1.subscriptionStatus === "unsubscribed") { res.status(200).send("already unsubscribed"); return; }
    patient1.subscriptionStatus = "unsubscribed";
    patient1.healthPackageSub = "";
    patient1.DateOfSubscribtion = "";
    patient1.save();
    res.status(200).send("Done");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



const getHealthRecords = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await PatientModel.findOne({ user: res.locals.userId });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientRecords = patient.health_records;
    res.status(200).json(patientRecords);
  } catch (error) {
    console.error('Error in getHealthRecords:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWallet = async (req, res) => {
  try {
    const patientName = req.params.patientName;
    console.log(patientName);
    const patient = await PatientModel.findOne({ user: res.locals.userId });
    console.log(patient);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientWallet = patient.wallet;
    res.status(200).json(patientWallet);
  } catch (error) {
    console.error('Error in getwallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
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
  updateWallet,
  getSessDiscount,
  linkPatient,
  patientDetails,
  cancelSubscription,
  unsubscribe,
  getHealthRecords,
  getWallet,
  checkIfLinked
}