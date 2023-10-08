import express from "express";
import controllers from "../controllers/doctor.js";

const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", controllers.createDoctor);
router.get("/getDoctors", controllers.getDoctors);
router.get("/getDoctorById", controllers.getDoctorById);
router.post("/UpdateDoctor", controllers.updateDoctor);
router.post("/getHealthRecord", controllers.getHealthRecord);
//view appointments 
import appointmentContoller from "../controllers/appointmentContoller.js";
router.get("/appointmentWithFilter",appointmentContoller.getAppointmentWithFilter);


export default router;