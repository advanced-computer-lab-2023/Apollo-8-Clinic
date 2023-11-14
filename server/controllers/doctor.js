import DoctorModel from '../models/doctor.js';
import UserModel from '../models/user.js';
import AppointmentModel from '../models/appointment.js';
import PatientModel from '../models/patient.js';
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import e from 'express';
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
    wallet,
    //sss
    speciality,
    availableSlots,
    //sss
  } = req.body;
  let files = {}
  req.files.forEach(file => {
    if (file.fieldname == "idFile") {
      files = { ...files, idFile: file.filename }
    } else if (file.fieldname == "degreeFile") {
      files = { ...files, degreeFile: file.filename }
    } else if (file.fieldname == "licenseFile") {
      files = { ...files, licenseFile: file.filename }
    }
  });
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   console.log(password)
    //   return res.status(400).json({ message: 'Password is invalid' });
    // }

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
          wallet,
          //sss
          speciality,
          availableSlots,
          //sss
          ...files
        });
        await doctor.save();
        console.log(doctor);
        res.status(200).json(doctor);
      } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json("Username already exist");
    }
  } catch (error) {
    console.log("error")
    res.status(400).json({ error: error.message });
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

  try {
    const doctor = await DoctorModel.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!doctor) return res.status(404).send("Doctor not found");
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const acceptDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(
      req.params.id,
      { status: 'PendingContract' },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const rejectDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).send(error.message);
  }

}

const getContract = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ user: res.locals.userId });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).send(error.message);
  }

}

const acceptDoctorContract = async (req, res) => {
  try {
    const doc = await DoctorModel.findOne({ user: res.locals.userId });
    const doctor = await DoctorModel.findByIdAndUpdate(
      doc._id,
      { status: 'Accepted' },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//sss
const getAllDoctors = async (req, res) => {
  console.log("wslnaa hnaa")
  // console.log(res.locals.userId)
  const pat = await PatientModel.findOne({ user: res.locals.userId });
  console.log(pat);
  try {
    const doctor = await DoctorModel.find({ status: "Accepted" });
    console.log(doctor);
    res.status(200).json(doctor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAcceptedDoctors = async (req, res) => {
  try {
    const user = await DoctorModel.find({ status: "Accepted" });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const searchByNameOrSpec = async (req, res) => {
  const body = req.body;
  //console.log(req.body);
  try {
    if (body.name) {
      const doctors = await DoctorModel.aggregate([
        {
          $project: {
            ['name']: 1,
            // ['_id']: 0,
            // ['email']: 1,
            // ['hospital']: 1,
            ['speciality']: 1,
          },
        }
      ]);
      const filteredArray = doctors.filter(object => object.name === body.name);
      //console.log("if part");
      //console.log(filteredArray);
      res.status(200).json(filteredArray)
    } else if (body.speciality) {
      const { speciality } = req.body;
      const doctors = await DoctorModel.aggregate([
        {
          $project: {
            ['name']: 1,
            // ['_id']: 0,
            // ['email']: 1,
            // ['hospital']: 1,
            ['speciality']: 1,
          },
        }
      ]);
      const filteredArray = doctors.filter(object => object.speciality === speciality);
      //console.log("else if part");
      //console.log(filteredArray);
      res.status(200).json(filteredArray)
    } else {
      const { name } = req.body;
      const { speciality } = req.body;
      const doctors = await DoctorModel.aggregate([
        {
          $project: {
            ['name']: 1,
            ['_id']: 0,
            // ['email']: 1,
            // ['hospital']: 1,
            ['speciality']: 1,
          },
        }
      ]);
      const filteredArray1 = doctors.filter(object => object.name === name);
      const filteredArray = filteredArray1.filter(object => object.speciality === speciality)
      //console.log(filteredArray);
      //console.log("else part");
      res.status(200).json(filteredArray)
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const filterBySpecOrAv = async (req, res) => {

  try {
    // Filter by speciality
    console.log(req.body)
    const { searchTime, searchSpec } = req.body;

    if (searchTime && searchSpec) {
      const filtered = await DoctorModel.find({ speciality: searchSpec, availableSlots: searchTime });
      res.status(200).json(filtered);
    }
    else if (searchSpec) {
      const filtered = await DoctorModel.find({ speciality: searchSpec })
      res.status(200).json(filtered);

    }
    else if (searchTime) {
      console.log("soso----" + searchTime)
      const filtered = await DoctorModel.find({ availableSlots: searchTime });
      res.status(200).json(filtered);
    }
    else {
      const filtered = await DoctorModel.find();
      res.status(200).json(filtered);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//=======
//handled in front end if somthing is not filledreturn previous thing
const updateDoctor = async (req, res) => {
  try {
    const email = req.body.email.trim();
    const rate = req.body.hourlyRate;
    const hospital = req.body.hospital.trim();
    //temp until get it from session
    const doctorID = req.body.doctorID;
    const doctor = await DoctorModel.findOne({ user: res.locals.userId })
    if (email && email !== "" && email.includes("@")) {
      doctor.email = email;
    }
    if (hospital && hospital !== "") {
      doctor.hospital = hospital;
    }
    if (rate && rate > 0) {
      doctor.hourlyRate = rate;
    }
    await doctor.save();
    res.status(200).json(doctor);
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getHealthRecord = async (req, res) => {
  try {
    const doc = await DoctorModel.findOne({ user: res.locals.userId })
    const doctorID = doc._id;
    const patientID = req.body.patientID;

    const appointment = await AppointmentModel.findOne({ doctorId: doctorID, patientId: patientID })
    if (appointment) {
      const Appointment = await AppointmentModel.find({ patientId: patientID }).populate('patientId')
      res.status(200).json(Appointment)
    }
    else {
      res.status(400).json({ error: "cannot look at that patient" })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const addAvailableTimeSlots = async (req, res) => {
  try {
    const doc = await DoctorModel.findOne({ user: res.locals.userId })
    const doctorId = doc._id;
    console.log('Doctor ID:', doctorId);
    const doctor = await DoctorModel.findOne({ _id: doctorId });
    console.log('Doctor:', doctor);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    if (doctor.status !== 'Accepted') {
      return res.status(403).json({ error: 'Doctor is not accepted yet' });
    }
    console.log('Doctor status:', doctor.status);
    console.log('Request Body:', req.body);
    const { availableSlots } = req.body;
    console.log('Date:', availableSlots);
    if (!doctor.availableSlots) {
      doctor.availableSlots = [];
    }



    // Ensure availableSlots is an array
    const slotsArray = Array.isArray(availableSlots) ? availableSlots : [availableSlots];
    doctor.availableSlots.push(...slotsArray);

    await doctor.save();
    res.status(200).json(doctor);
    console.log('Doctor after saving:', doctor);
  } catch (error) {
    console.error("Error in addAvailableTimeSlots:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const addHealthRecords = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
    console.log('Doctor ID:', doctorId);
    console.log('Patient ID:', patientId);
    const doctor = await DoctorModel.findOne({ user: res.locals.userId })
    if (!doctor || doctor.status !== 'Accepted') {
      return res.status(403).json({ error: 'Doctor not found or not accepted by the admin' });
    }
    const patient = await PatientModel.findOne({ _id: patientId });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const healthRecord = {
      date: req.body.date,
      description: req.body.description,
      image: req.files[0].filename
    }
    if (!patient.health_records) {
      patient.health_records = { records: [] };
    }
    if (Array.isArray(healthRecord)) {
      patient.health_records.records.push(...healthRecord);
    } else {
      patient.health_records.records.push(healthRecord);
    }
    await patient.save();
    console.log('Patient after saving health records:', patient);
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error in getHealthRecords:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getWallet = async (req, res) => {
  try {
    const doctorName = req.params.doctorName;
    console.log(doctorName);
    await DoctorModel.findOne({ user: res.locals.userId })
    const doctor = await DoctorModel.findOne({ user: res.locals.userId })
    console.log(doctor);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const doctorWallet = doctor.wallet;
    res.status(200).json(doctorWallet);
  } catch (error) {
    console.error('Error in getwallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateAppointment = async (req, res) => {
  try {
    const { appointmentId, newType } = req.body;
    const doctorName = "helen";
    const doctor = await DoctorModel.findOne({ user: res.locals.userId });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    if (!appointmentId || !newType) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the doctor is allowed to change appointment type
    const appointment = await AppointmentModel.findOne({
      _id: appointmentId
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Allow changing from 'regular' to 'follow up'
    if (appointment.type === "regular" && newType === "follow up") {
      appointment.type = newType;
      await appointment.save();
      return res.status(200).json(appointment);
    } else {
      return res.status(400).json({ error: "Invalid type change request" });
    }
  } catch (error) {
    console.error("Error in changeAppointmentType:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export default {
  createDoctor,
  getDoctorById,

  getDoctors,
  acceptDoctor,
  rejectDoctor,
  acceptDoctorContract,
  getContract,

  getAllDoctors,
  searchByNameOrSpec,
  filterBySpecOrAv,

  createDoctor,
  updateDoctor,
  getHealthRecord,
  getAcceptedDoctors,
  addAvailableTimeSlots,
  addHealthRecords,
  getWallet,

  updateAppointment,

}