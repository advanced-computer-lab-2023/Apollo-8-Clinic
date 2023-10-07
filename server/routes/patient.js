import express from "express";
import controllers from "../controllers/patient.js";

const router = express.Router();

// DELETE THESE COMMENTS AFTER YOU READ THEM :)
// to test this send a post request to this route: http://localhost:8000/patient
router.post("/", controllers.createPatient);

// if your route is : router.post("/something", controllers.something)
// then test it by sending post request to this route: http://localhost:8000/patient/something

// lw mesh fahem el "/patient" gat mnen fa e7na 3amlenha fi el index.js file fi el line da (app.use("/patient", patientRoutes);)

export default router;