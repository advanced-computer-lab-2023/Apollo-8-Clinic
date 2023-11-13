import express from "express";
import controllers from "../controllers/appointmentContoller.js";
const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", controllers.createAppointment);
router.get("/:doctorName", controllers.getAppointments);
router.get("/getPatientAppointments/:id",controllers.getPatientAppointments);
export default router;