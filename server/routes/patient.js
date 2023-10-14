import express from "express";
import controllers from "../controllers/patient.js";
import doctor from "../controllers/doctor.js";

const router = express.Router();

// DELETE THESE COMMENTS AFTER YOU READ THEM :)
// to test this send a post request to this route: http://localhost:8000/patient
router.post("/", controllers.createPatient);
router.get("/", controllers.getPatients);
router.get("/getPerscriptions", controllers.getPrescriptions)
router.post("/filterPerscriptions", controllers.filterPres)
router.get("/getPerscription/:id", controllers.getPres)

//get or add family members
import FamilyMemberController from "../controllers/FamilyMemberController.js";
router.get("/Family/:patientID", FamilyMemberController.getAllFamMembers);
router.post("/AddFamilyMember/:patientID", FamilyMemberController.addNewFamilyMember);

//view all the health packages 
import HealthPackageController from '../controllers/healthPackageController.js';
router.get('/healthPackage', HealthPackageController.getAllHealthPackages);

//view appointments
import appointmentContoller from "../controllers/appointmentContoller.js";
router.post("/appointmentWithFilter", appointmentContoller.getAppointmentWithFilter);

//sss
router.get("/allDoctors", doctor.getAllDoctors);
router.get("/docInfo/:id", doctor.getDoctorById);
router.get("/docSearch", doctor.searchByNameOrSpec);
router.get("/docFilter", doctor.filterBySpecOrAv);
// router.get("/searchDocNameASpec", doctor.getDoctorByNameASpec);
// router.get("/searchDocNameOrSpec", doctor.getDoctorByNameOrSpec);
// router.get("/searchDocSpecASlots", doctor.getDoctorAvailableAndS);
//sss
// if your route is : router.post("/something", controllers.something)
// then test it by sending post request to this route: http://localhost:8000/patient/something

// lw mesh fahem el "/patient" gat mnen fa e7na 3amlenha fi el index.js file fi el line da (app.use("/patient", patientRoutes);)

export default router;