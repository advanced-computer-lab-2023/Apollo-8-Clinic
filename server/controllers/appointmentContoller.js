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


//test it using http://localhost:8000/doctor/appointmentWithFilter?startDate=2002-1-1&endDate=2003-1-1

const getAppointmentWithFilter = async (req, res) => {
    try {
        const { startDate, endDate , status } = req.query; // Destructure status and dates from query parameters
        let query = {};

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
            if (status) {
              query.status = status;
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
