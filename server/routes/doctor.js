import express from "express";
import controllers from "../controllers/doctor.js";
import patient from "../controllers/patient.js";

const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", controllers.createDoctor);
router.get("/", controllers.getDoctors);
router.get("/:id", controllers.getDoctorById);
router.put("/accept/:id", controllers.acceptDoctor);
router.put("/reject/:id", controllers.rejectDoctor);
router.get("/viewPatients", patient.getMyPatients);
router.get("/viewPatientsByName", patient.getPatientByName);
router.get("/futureAppointmentPatients", patient.upcomingApp);
router.post("/UpdateDoctor", controllers.updateDoctor);
router.post("/getHealthRecord", controllers.getHealthRecord);
//view appointments 
import appointmentContoller from "../controllers/appointmentContoller.js";
router.post("/appointmentWithFilter", appointmentContoller.getAppointmentWithFilter);

export default router;