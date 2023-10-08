import express from "express";
import controllers from "../controllers/admin.js";

const router = express.Router();

// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/createUser", controllers.createUser);
router.get("/getUsers", controllers.getUsers);
router.post("/addAdministrator", controllers.addAdministrator);
router.delete("/removeUser", controllers.removeUser);

export default router;