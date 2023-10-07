import express from "express";
import controllers from "../controllers/doctor.js";

const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/", controllers.createDoctor);

export default router;