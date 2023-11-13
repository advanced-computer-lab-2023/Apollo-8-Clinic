import appointments from "../models/appointment.js";
import DoctorModel from '../models/doctor.js';
//filtering options:(date) (status) (date&status) (no filter)
import { constants } from 'crypto';
import AppointmentModel from '../models/appointment.js';


const createAppointment = async (req, res) => {
  const {
    doctorId,
    patientId,
    date,
    status,
    type
  } = req.body;
  console.log(req.body)
  try {
    const appointment = new AppointmentModel({
      doctorId,
      patientId,
      date,
      status,
      type
    });
    const updatedDoctor = await DoctorModel.findOneAndUpdate(
      { "_id": doctorId },
      { $pull: { availableSlots: date } },
      { new: true } // To return the updated document
    );
    console.log(updatedDoctor.availableSlots);
    await appointment.save();
    console.log(appointment);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};


const getPatientAppointments = async (req, res) => {
  try {
    const patientID = req.params.id;
    const appointments1 = await AppointmentModel.find({ "patientId": patientID });
//     let result = {};

// for(let appointment1 of appointments1) {
//   let doctor = await DoctorModel.findById(appointment1.doctorId);
//   let newObj = {
//     status: appointment1.status,
//     date: appointment1.date,
//     doctorName: doctor.name
//   };
//   result[appointment1._id] = newObj;
// }
//      res.status(200).send(result);
res.status(200).json(appointments1);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//test it using http://localhost:8000/doctor/appointmentWithFilter?startDate=2002-1-1&endDate=2003-1-1

const getAppointmentWithFilter = async (req, res) => {
  try {
    const { startDate, endDate, status, doctorId, patientId } = req.body; // Destructure status and dates from query parameters
    let query = {};

    if (patientId) {
      query.patientId = patientId;
    }

    if (doctorId) {
      query.doctorId = doctorId;
    }

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);

      if (start.toDateString() === end.toDateString()) {
        end.setDate(end.getDate() + 1);
      }

      if (end > start) {
        query.date = {
          $gte: start,
          $lt: end
        };
      } else {
        return res.status(400).json({ error: "Please enter a valid date range" });
      }
    }
    const appointment = await appointments.find(query);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAppointments = async (req, res) => {
  try {
    const doctorName = req.params.doctorName;
    console.log("doctorname" + doctorName);
    const doctor = await DoctorModel.findOne({ name: doctorName });
    console.log("doctor" + doctor);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const appointments = await AppointmentModel.find({ doctorId: doctor._id }).populate('doctorId').populate('patientId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const patientApp = async (req, res) => {  // to get all appointments for a selected dr.
  try {
    const { patientId } = req.body;
    const appointment = await appointments.find({ patientId: patientId });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  createAppointment,
  getAppointmentWithFilter,
  getAppointments,
  patientApp,
  getPatientAppointments
}
