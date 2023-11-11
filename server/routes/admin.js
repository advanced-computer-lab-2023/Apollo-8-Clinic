import express from "express";
import controllers from "../controllers/admin.js";
import Auth from "../Authentication/login.js"
import forget from "../Authentication/forget.js"
import changePass from "../Authentication/changePass.js";
import Middle from "../Authentication/Middleware.js"

const router = express.Router();
//youhanna reset password
router.post("/forget",forget.forget)
router.post("/compare",forget.compare)
router.post("/chanePass",changePass.changePass)
router.get("/getType",Middle.getType)





// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/createUser", controllers.createUser);
router.get("/getUsers", controllers.getUsers);
router.post("/addAdministrator", controllers.addAdministrator);
router.delete("/removeUser", controllers.removeUser);
router.post("/adminLogin",Auth.loginAdmin)

//health packages (view,add,update,delete)
import HealthPackageController from '../controllers/healthPackageController.js';
router.get('/healthPackage',HealthPackageController.getAllHealthPackages);
router.post('/healthPackage', HealthPackageController.createHealthPackage);
router.put('/healthPackage/:id', HealthPackageController.updateHealthPackage);
router.delete('/healthPackage/:id', HealthPackageController.deleteHealthPackage);

export default router;