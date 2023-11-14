import express from "express";
import controllers from "../controllers/appointmentContoller.js";
import Middle from "../Authentication/Middleware.js"
const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", Middle.requireAuthPatient, controllers.createAppointment);
router.get("/:doctorName", Middle.requireAuthDoctor, controllers.getAppointments);
router.get("/getPatientAppointments/:id", Middle.requireAuthPatient, controllers.getPatientAppointments);
export default router;