import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import DoctorSignup from "./pages/DoctorSignup";
import PatientSignup from "./pages/PatientSignup";
import Home from "./pages/Home";
import PrescriptionsList from "./pages/PrescriptionsList";
import EditDoctor from "./pages/EditDoctor";
import AllDoctors from "./pages/AllDoctors";
import DoctorInfo from "./pages/DoctorInfo";
import ViewDoctor from "./pages/ViewDoctor";
import FilterDoctor from "./pages/FilterDoctor";
//youhanna milestone 2222
import Doctorlogin from "./pages/DoctorLogin";
import Adminlogin from "./pages/AdminLogin";
import Patientlogin from "./pages/PatientLogin";
import Forget from "./pages/ForgetPassword";
import ChangePass from "./pages/chnagePass";
import ChangePassDoc from "./pages/changePassDoc";
import ChangePassAdm from "./pages/changePassAdm";


import MyPatientsList from "./pages/MyPatientsList";
import UpcomingAppointments from "./pages/UpcomingAppointments";
import AddAdmin from "./pages/AddAdmin";
import RemoveUser from "./pages/RemoveUser";
import PendingDoctors from "./pages/PendingDoctors";
import DoctorDetails from "./pages/DoctorDetails";
import Health from "./pages/ViewHealthRecords";
//import DoctorLogin from "./pages/DoctorLogin";

import MainDoctor from "./pages/DoctorAppointments";
import App1 from "./pages/adminHealthP";
import AppPatient from "./pages/patientFamApp";
import PrescriptionsDetails from "./pages/PrescriptionDetails";
//apply sessDiscount for patients
import DoctorsWithDiscount from "./pages/DoctorsWithDiscount";

function App() {
  const token=JSON.parse(sessionStorage.getItem('token'));
  if(token){
    console.log("hii")
  return (
    <div>
      <Routes>
        <Route path="/registerDoctor" element={<DoctorSignup />} />
        <Route path="/registerPatient" element={<PatientSignup />} />
        <Route path="/prescriptionsList" element={<PrescriptionsList />} />
        <Route path="/prescriptions/:id" element={<PrescriptionsDetails />} />
        <Route path="/editDoctor" element={<EditDoctor />} />
        <Route path="/" element={<Home />} />
        <Route path="/allDoctors" element={<AllDoctors />} />
        <Route path="/doctorInfo/:id" element={<DoctorInfo />} />
        <Route path="/viewDoctor/:id" element={<ViewDoctor />} />
        <Route path="/filter" element={<FilterDoctor />} />
        <Route path="/viewMyPatients" element={<MyPatientsList />} />
        <Route path="/viewUpcomingApp" element={<UpcomingAppointments />} />
        <Route path="/addAdministrator" element={<AddAdmin />} />
        <Route path="/removeUser" element={<RemoveUser />} />
        <Route path="/pendingDoctors" element={<PendingDoctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/doctorAppointments" element={<MainDoctor />} />
        <Route path="/patientFamilyAppointments" element={<AppPatient />} />
        <Route path="/adminHealthPackage" element={<App1 />} />
        <Route path="/viewHealth/:patientID" element={<Health />} />
        <Route path="/DoctorsWithDiscount" element={<DoctorsWithDiscount />} />
        <Route path="/DoctorLogin"element={<Doctorlogin />}/>
        <Route path="/AdminLogin"element={<Adminlogin />}/>
        <Route path="/PatientLogin"element={<Patientlogin />}/>
        <Route path="/ForgetPassword"element={<Forget />}/>
        <Route path="/changePassPat"element={<ChangePass />}/>
        <Route path="/changePassDoc"element={<ChangePassDoc />}/>
        <Route path="/changePassAdm"element={<ChangePassAdm />}/>
      </Routes>
    </div>
  );
  }
  else{
    console.log("asasa")
    return (
      <div>
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/registerDoctor" element={<DoctorSignup />} />
        <Route path="/registerPatient" element={<PatientSignup />} />
        <Route path="/DoctorLogin"element={<Doctorlogin />}/>
        <Route path="/AdminLogin"element={<Adminlogin />}/>
        <Route path="/PatientLogin"element={<Patientlogin />}/>
        <Route path="/ForgetPassword"element={<Forget />}/>
         <Route path="/:any" element={<Home />} />
         </Routes>
        </div>
    )
  }
}

export default App;
