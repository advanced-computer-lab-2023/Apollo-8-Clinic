import express from "express";
import controllers from "../controllers/appointmentContoller.js";
import Middle from "../Authentication/Middleware.js"
const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", Middle.requireAuthPatient, controllers.createAppointment);
router.get("/", controllers.getAllAppointments);
router.get("/getAppCall", Middle.requireAuth, controllers.getMyAppointmers);
router.get("/:doctorName", Middle.requireAuthDoctor, controllers.getAppointments);
router.get("/getPatientAppointments/:id", Middle.requireAuthPatient, controllers.getPatientAppointments);
router.post("/rescheduleAppointment/:id", Middle.requireAuthPatient, controllers.rescheduleAppointment);
router.post("/docRescheduleAppointment/:id", Middle.requireAuthDoctor, controllers.rescheduleAppointment);
router.post("/cancelAppointment/:id", Middle.requireAuthPatient, controllers.cancelAppointment);
router.post("/docCancelAppointment/:id", Middle.requireAuthDoctor, controllers.cancelAppointment);
router.get("/:doctorName", Middle.requireAuthDoctor, controllers.getAppointments);
router.get("/getPatientAppointments/:id", Middle.requireAuthPatient, controllers.getPatientAppointments);


export default router;