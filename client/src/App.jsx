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

import MyPatientsList from "./pages/MyPatientsList";
import UpcomingAppointments from "./pages/UpcomingAppointments";
import AddAdmin from "./pages/AddAdmin";
import RemoveUser from "./pages/RemoveUser";
import PendingDoctors from "./pages/PendingDoctors";
import DoctorDetails from "./pages/DoctorDetails";
import View from "./pages/ViewHealthRecords";

//check it
import MainDoctor from "./pages/DoctorAppointments";
import App1 from "./pages/adminHealthP";
import AppPatient from "./pages/patientFamApp";
import PrescriptionsDetails from "./pages/PrescriptionDetails";

function App() {
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
        <Route path="/doctors/:id" element={<ViewDoctor />} />
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
        <Route path="/viewHealth" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;
