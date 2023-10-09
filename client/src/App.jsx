import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import DoctorSignup from "./pages/DoctorSignup";
import PatientSignup from "./pages/PatientSignup";
import Home from "./pages/Home";
import AddAdmin from "./pages/AddAdmin";
import RemoveUser from "./pages/RemoveUser"
import PendingDoctors from "./pages/PendingDoctors"
import DoctorDetails from "./pages/DoctorDetails"
function App() {


  return (
    <div>
      <Routes>
        <Route path="/registerDoctor" element={<DoctorSignup />} />
        <Route path="/registerPatient" element={<PatientSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addAdministrator" element={<AddAdmin/>}/>
        <Route path="/removeUser" element={<RemoveUser/>}/>
        <Route path="/pendingDoctors" element={<PendingDoctors/>}/>
        <Route path="/doctors/:id" element={<DoctorDetails />} />
      </Routes>
    </div>
  );
}

export default App;
