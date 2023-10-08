import express from "express";
import controllers from "../controllers/patient.js";

const router = express.Router();

// DELETE THESE COMMENTS AFTER YOU READ THEM :)
// to test this send a post request to this route: http://localhost:8000/patient
router.post("/createPatient", controllers.createPatient);
router.get("/getPatients", controllers.getPatients);

//get or add family members
import FamilyMemberController from "../controllers/FamilyMemberController.js";
router.get("/Family",FamilyMemberController.getAllFamMembers);
router.post("/AddFamilyMember",FamilyMemberController.addNewFamilyMember);

//view all the health packages 
import HealthPackageController from '../controllers/healthPackageController.js';
router.get('/healthPackage',HealthPackageController.getAllHealthPackages);

//view appointments
import appointmentContoller from "../controllers/appointmentContoller.js";
router.get("/appointmentWithFilter",appointmentContoller.getAppointmentWithFilter);

// if your route is : router.post("/something", controllers.something)
// then test it by sending post request to this route: http://localhost:8000/patient/something

// lw mesh fahem el "/patient" gat mnen fa e7na 3amlenha fi el index.js file fi el line da (app.use("/patient", patientRoutes);)

export default router;