import express from "express";
import controllers from '../controllers/doctor.js';

const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", controllers.createDoctor);
router.get("/", controllers.getDoctors);
router.get("/:id", controllers.getDoctorById);
router.put("/accept/:id",controllers.acceptDoctor);
router.put("/reject/:id",controllers.rejectDoctor);
export default router;