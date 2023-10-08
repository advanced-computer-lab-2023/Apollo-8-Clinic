import appointments from "../models/appointment.js";

//filtering options:(date) (status) (date&status) (no filter)
import { constants } from 'crypto';
import AppointmentModel from '../models/appointment.js';
const createAppointment = async (req, res) => {
  const {
    doctorId,
    patientId,
    date,
    status
  } = req.body;
  console.log(req.body)
  try {
    const appointment = new AppointmentModel({
      doctorId,
      patientId,
      date,
      status
    });
    await appointment.save();
    console.log(appointment);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};
const getAppointmentWithFilter = async (req, res) => {
  try {
    const { status, date } = req.query; // Destructure status and date from query parameters
    let query = {};

    if (status) {
      query.status = status;
    }

    if (date) {
      let start = new Date(date);
      let end = new Date(start);
      end.setDate(end.getDate() + 1);

      query.date = {
        $gte: start,
        $lt: end
      };
    }

    const appointment = await appointments.find(query);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  createAppointment,
  getAppointmentWithFilter
}
