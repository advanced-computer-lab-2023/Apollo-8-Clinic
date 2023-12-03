import appointments from "../models/appointment.js";
import DoctorModel from '../models/doctor.js';
import PatientModel from "../models/patient.js";
//filtering options:(date) (status) (date&status) (no filter)
import { constants } from 'crypto';
import AppointmentModel from '../models/appointment.js';


const createAppointment = async (req, res) => {
  const patient1 = await PatientModel.findOne({ user: res.locals.userId });
  const patientId = patient1._id;
  const {
    doctorId,
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
    const updatedPatient = await PatientModel.findOneAndUpdate(
      { "_id": patientId },
      { $inc: { wallet: -50 } },
      { new: true } // To return the updated document
    );
    console.log(updatedDoctor.availableSlots);
    console.log(updatedPatient.wallet);
    await appointment.save();
    console.log(appointment);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};

const getAllAppointments = async (req, res) => {
  try {
    const user = await AppointmentModel.find();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};
const getPatientAppointments = async (req, res) => {
  try {
    const patient1 = await PatientModel.findOne({ user: res.locals.userId });
    const patientID = patient1._id;
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
    const { startDate, endDate, status } = req.body; // Destructure status and dates from query parameters
    let query = {};

    const patient = await PatientModel.findOne({ user: res.locals.userId });
    const doctor = await DoctorModel.findOne({ user: res.locals.userId });
    if (patient) {
      query.patientId = patient._id;
    }

    if (doctor) {
      query.doctorId = doctor._id;
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
    const doctor = await DoctorModel.findOne({ user: res.locals.userId });
    // const doctorName = req.params.doctorName;
    // console.log("doctorname" + doctorName);
    // const doctor = await DoctorModel.findOne({ name: doctorName });
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
const rescheduleAppointment = async (req, res) => {
  try{
  const { _id,date } = req.body; // Destructure status and dates from query parameters
    let query = {};

    const patient = await PatientModel.findOne({ user: res.locals.userId });
    const doctor = await DoctorModel.findOne({ user: res.locals.userId });
    if (patient) {
      query.patientId = patient._id;
    }

    if (doctor) {
      query.doctorId = doctor._id;
    }
    if (_id) {
      query._id = _id;
    }
    if (date) {
      query.date = date;
    }
    const updatedApp = await AppointmentModel.findOneAndUpdate(
      { "_id": _id },
      { $set: { date: date } },
      { new: true } // To return the updated document
    );
    console.log(updatedApp);
    res.status(200).json(updatedApp);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};
const cancelAppointment = async (req, res) => {
  try{
  const { _id} = req.body; 
    let query = {};
    if (_id) {
      query._id = _id;
    }
    const appointment = await AppointmentModel.findOne({ _id: query._id });
    const patient = await PatientModel.findOne({ _id: res.locals.userId });
    const doctor = await DoctorModel.findOne({ user: res.locals.userId });
    console.log(appointment);
    console.log(patient);

    if (patient) {
      query.patientId = patient._id;
      if (appointment) {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      
        const appointmentDate = new Date(appointment.date);
      
        if (appointmentDate < twentyFourHoursAgo) {
          // The appointment date is less than 24 hours before now
          console.log("Appointment is less than 24 hours before now.");
          const updatedPatient = await PatientModel.findOneAndUpdate(
            { "_id": appointment.patientId },
            { $inc: { wallet: 50 } },
            { new: true } // To return the updated document
          );
        } else {
          // The appointment is more than 24 hours away
          console.log("Appointment is more than 24 hours away.");
        }
      } else {
        // Handle the case where no appointment is found
        console.log("Appointment not found.");
      }
    }

    if (doctor) {
      query.doctorId = doctor._id;
      const updatedPatient = await PatientModel.findOneAndUpdate(
        { "_id": appointment.patientId },
        { $inc: { wallet: 50 } },
        { new: true } // To return the updated document
      );
    }
    const updatedDoctor = await DoctorModel.findOneAndUpdate(
      { "_id": appointment.doctorId },
      { $push: { availableSlots: appointment.date } },
      { new: true } // To return the updated document
    );
    await AppointmentModel.deleteOne({ _id: query._id });
    const updatedApp = await AppointmentModel.find();
    console.log(updatedApp);
    res.status(200).json(updatedApp);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};
export default {
  createAppointment,
  getAllAppointments,
  getAppointmentWithFilter,
  getAppointments,
  patientApp,
  getPatientAppointments,
  rescheduleAppointment,
  cancelAppointment
}
