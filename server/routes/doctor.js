import express from "express";
import controllers from "../controllers/doctor.js";
import patient from "../controllers/patient.js";
import uploadMiddleware from "../middlewares/uploadmiddleware.js";
import Middle from "../Authentication/Middleware.js"

import Auth from "../Authentication/login.js"

const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
//no middlewaree
router.post("/", uploadMiddleware, controllers.createDoctor);
//

router.put("/acceptContract", Middle.requireAuthDoctor, controllers.acceptDoctorContract);
router.get("/contract", Middle.requireAuthDoctor, controllers.getContract);
router.get("/", Middle.requireAuthAdmin, controllers.getDoctors); //take care! to be used only for admins where status=Pending,Rejected,Accepted
router.get("/getAcceptedDoctors", Middle.requireAuth, controllers.getAcceptedDoctors);//for doctors and patients in the sys
router.get("/:id", Middle.requireAuth, controllers.getDoctorById);
router.put("/accept/:id", Middle.requireAuthAdmin, controllers.acceptDoctor);
router.put("/reject/:id", Middle.requireAuthAdmin, controllers.rejectDoctor);
router.get("/viewPatients/:id", Middle.requireAuthDoctor, patient.getMyPatients);
//not called any where
router.get("/viewPatientsByName", patient.getPatientByName);
router.get("/futureAppointmentPatients/:id", Middle.requireAuthDoctor, patient.upcomingApp);
router.post("/UpdateDoctor", Middle.requireAuthDoctor, controllers.updateDoctor);
router.post("/getHealthRecord", Middle.requireAuthDoctor, controllers.getHealthRecord);
router.post('/add-available-time-slot', Middle.requireAuthDoctor, controllers.addAvailableTimeSlots);
router.post('/addHealthRecords', Middle.requireAuthDoctor, uploadMiddleware, controllers.addHealthRecords);
router.get("/getWallet/:doctorName", Middle.requireAuthDoctor, controllers.getWallet);
router.put("/updateAppointment/:doctorName", Middle.requireAuthDoctor, controllers.updateAppointment)
//no need
router.post("/doctorLogin", Auth.loginDoctor)
//view appointments chekkkk whattttt is thattt??? check requirment 23 :|
import appointmentContoller from "../controllers/appointmentContoller.js";
router.post("/appointmentWithFilter", Middle.requireAuth, appointmentContoller.getAppointmentWithFilter);

//prescription
router.get("/prescriptionPDF/:id",Middle.requireAuthDoctor,controllers.printPresPDF)
router.post("/addPrescription",Middle.requireAuthDoctor,controllers.addPrescription)
router.put("/updatePresAdd/:id",Middle.requireAuthDoctor,controllers.updatePrescription_AddMed)
router.put("/updatePresDelete/:id",Middle.requireAuthDoctor,controllers.updatePrescription_DeleteMed)
router.put("/updatePresDose/:id",Middle.requireAuthDoctor,controllers.updatePrescription_Dosage)
//router.delete("/DeletePres/:id",Middle.requireAuthDoctor,controllers.deletePrescription)


export default router;