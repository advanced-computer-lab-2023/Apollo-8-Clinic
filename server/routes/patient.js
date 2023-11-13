import express from "express";
import controllers from "../controllers/patient.js";
import doctor from "../controllers/doctor.js";
import healthPackageController from "../controllers/healthPackageController.js";
import Auth from "../Authentication/login.js"
import Middle from "../Authentication/Middleware.js";

const router = express.Router();

// DELETE THESE COMMENTS AFTER YOU READ THEM :)
// to test this send a post request to this route: http://localhost:8000/patient
router.post("/", controllers.createPatient);
router.get("/", controllers.getPatients);
router.get("/getPatientHealthPackage/:id", controllers.getPatientHealthPackage);
router.get("/getPerscriptions", controllers.getPrescriptions)
router.post("/filterPerscriptions", controllers.filterPres)
router.get("/getPerscription/:id", controllers.getPres)
router.post("/patientLogin", Auth.loginPatient)

//view all the health packages 
//when testing it on postman, make sure to send the request with an empty body {} 
router.get('/healthPackage', healthPackageController.getAllHealthPackages);
router.get('/healthPackage/:id', healthPackageController.getHealthPackageDetails);

//subscribe for a health package for me or my fam
router.post("/subscribeForMe/:id", healthPackageController.subscribeForPatient);
router.post("/subscribeForFam/:id", healthPackageController.subscribeForFamily);

//cancel sub
router.post('/cancelMYsubscription/:id', patient.cancelSubscription);
router.post('/cancelFMsubscription/:id', FamilyMemberController.cancelSubscription);

//unsubscribe
router.post('/unsubscribeForMe/:id', patient.unsubscribe);
router.post('/unsubscribeForMember/:id', FamilyMemberController.unsubscribe);


//display patient's detials including HP subscription
// do we need to update healthpackage subsc. if it is expired (duration 1 year)
router.get('/patientdetails/:patientID', patient.patientDetails);
router.get("/getWallet/:patientName", Middle.requireAuthPatient, controllers.getWallet)
//get or add family members
import FamilyMemberController from "../controllers/FamilyMemberController.js";
router.get("/NotlinkedFamily/:patientID", FamilyMemberController.getNotLinkedFamMembers);
router.get("/LinkedFamily/:patientID", FamilyMemberController.getLinkedFamMembers);

router.post("/AddFamilyMember/:patientID", FamilyMemberController.addNewFamilyMember);

// link or add a family member using mail or phone number
router.post("/linkPatient/:patientID", patient.linkPatient);

//for patient - family member connection
// router.get("/Family/:patientID", FamilyMemberController.getAllFamMembers);
// router.post("/AddFamilyMember/:patientID", FamilyMemberController.addNewFamilyMember);

//apply sessDiscount on dr's session price
router.post('/getsessDiscount/', controllers.getSessDiscount);
router.put('/updateWallet', controllers.updateWallet);


//view all the health packages 
router.get('/health-records/:patientId', Middle.requireAuthPatient, controllers.getHealthRecords);
//view appointments
import appointmentContoller from "../controllers/appointmentContoller.js";
import patient from "../controllers/patient.js";
router.post("/appointmentWithFilter", appointmentContoller.getAppointmentWithFilter);


router.get('/mydiscount/:id',patient.checkIfLinked);

//sss
router.get("/allDoctors", Middle.requireAuthPatient, doctor.getAllDoctors);
router.get("/docInfo/:id", doctor.getDoctorById);
router.get("/docSearch", doctor.searchByNameOrSpec);
router.post("/docFilter", doctor.filterBySpecOrAv);

// router.get("/searchDocNameASpec", doctor.getDoctorByNameASpec);
// router.get("/searchDocNameOrSpec", doctor.getDoctorByNameOrSpec);
// router.get("/searchDocSpecASlots", doctor.getDoctorAvailableAndS);
//sss
// if your route is : router.post("/something", controllers.something)
// then test it by sending post request to this route: http://localhost:8000/patient/something

// lw mesh fahem el "/patient" gat mnen fa e7na 3amlenha fi el index.js file fi el line da (app.use("/patient", patientRoutes);)
router.post("/myApp", appointmentContoller.patientApp);

export default router; 