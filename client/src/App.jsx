import "bootstrap/dist/css/bootstrap.min.css";
//import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';
import React from 'react';
import DoctorSignup from "./pages/DoctorSignup";
import PatientSignup from "./pages/PatientSignup";
import Home from "./pages/Home";
import PrescriptionsList from "./pages/PrescriptionsList";
import EditDoctor from "./pages/EditDoctor";
import AllDoctors from "./pages/AllDoctors";
import DoctorInfo from "./pages/DoctorInfo";
import SearchDoctor from "./pages/SearchDoctor";
import MyPatientsList from "./pages/MyPatientsList";
import UpcomingAppointments from "./pages/UpcomingAppointments";
import AddAdmin from "./pages/AddAdmin";
import RemoveUser from "./pages/RemoveUser";
import PendingDoctors from "./pages/PendingDoctors";
import DoctorDetails from "./pages/DoctorDetails";
//check it 
import MainDoctor from "./pages/DoctorAppointments";
import App1 from "./pages/adminHealthP";
import AppPatient from "./pages/patientFamApp";

function App() {
  return (
    <div>
      <Routes>

        <Route path="/registerDoctor" element={<DoctorSignup />} />
        <Route path="/registerPatient" element={<PatientSignup />} />
        <Route path="/prescriptionsList" element={<PrescriptionsList />} />
        <Route path="/editDoctor" element={<EditDoctor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patient/allDoctors" element={<AllDoctors />} />
        <Route path="/doctorInfo" element={<DoctorInfo />} />
        <Route path="/search" element={<SearchDoctor />} />
        <Route path="/viewMyPatients" element={<MyPatientsList />} />
        <Route path="/viewUpcomingApp" element={<UpcomingAppointments />} />
        <Route path="/addAdministrator" element={<AddAdmin />} />
        <Route path="/removeUser" element={<RemoveUser />} />
        <Route path="/pendingDoctors" element={<PendingDoctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/doctorAppointments"><MainDoctor/></Route>
        <Route path="/patientFamilyAppointments"><AppPatient/></Route>
        <Route path="/adminHealthPackage"><App1 /></Route>
   
      </Routes>
    </div>
  );
}

export default App;
