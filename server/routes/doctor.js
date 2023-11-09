import express from "express";
import controllers from "../controllers/doctor.js";
import patient from "../controllers/patient.js";


const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", controllers.createDoctor);
router.get("/", controllers.getDoctors); //take care! to be used only for admins where status=Pending,Rejected,Accepted
router.get("/getAcceptedDoctors",controllers.getAcceptedDoctors);//for doctors and patients in the sys
router.get("/:id", controllers.getDoctorById);
router.put("/accept/:id", controllers.acceptDoctor);
router.put("/reject/:id", controllers.rejectDoctor);
router.get("/viewPatients/:id", patient.getMyPatients);
router.get("/viewPatientsByName", patient.getPatientByName);
router.get("/futureAppointmentPatients/:id", patient.upcomingApp);
router.post("/UpdateDoctor", controllers.updateDoctor);
router.post("/getHealthRecord", controllers.getHealthRecord);
router.post('/add-available-time-slot/',controllers.addAvailableTimeSlots);
router.post ('/addHealthRecords',controllers.addHealthRecords);
router.get("/getWallet",controllers.getWallet);
router.post("/updateAppointment",controllers.updateAppointment)
//view appointments 
import appointmentContoller from "../controllers/appointmentContoller.js";
router.post("/appointmentWithFilter", appointmentContoller.getAppointmentWithFilter);

export default router;