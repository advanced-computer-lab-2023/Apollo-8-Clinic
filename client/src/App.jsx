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

import AppPatient from "./pages/patientFamApp";
import MyPatientsList from "./pages/MyPatientsList";
import UpcomingAppointments from "./pages/UpcomingAppointments";
import AddAdmin from "./pages/AddAdmin";
import RemoveUser from "./pages/RemoveUser";
import PendingDoctors from "./pages/PendingDoctors";
import DoctorDetails from "./pages/DoctorDetails";
import Health from "./pages/ViewHealthRecords";
import AddTimeSlots from "./pages/AddTimeSlots";
import AddHealthRecords from "./pages/AddHealthRecords";
import PatientHealthRecords from "./pages/PatientHealthRecords";
import MainDoctor from "./pages/DoctorAppointments";
import App1 from "./pages/adminHealthP";
import PrescriptionsDetails from "./pages/PrescriptionDetails";
//apply sessDiscount for patients
import DoctorsWithDiscount from "./pages/DoctorsWithDiscount";
import AppointmentWalletPayment from "./pages/AppointmentWalletPayment";
import PatientWallet from "./pages/PatientWallet";
import DoctorWallet from "./pages/DoctorWallet";
import FollowUP from "./pages/FollowUP";
import HomePage from "./pages/HomePage";
import HomePageDoc from "./pages/HomePageDoc";
import PatientHP_FM from "./pages/PatientFamilyHP";
import PatientAppointments from "./pages/PatientAppointments";
import AvailableAppointments from "./pages/AvailableAppointments";
import HomePageAdmin from "./pages/HomePageAdmin";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  sessionStorage.getItem("token")
)}`;

function App() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [type, setData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/admin/getType");

        setData(result.data.type);
        setDataFetched(true);
      } catch (err) {
        console.log(err);
        setDataFetched(true);
      }
    };

    fetchData();
  }, [token]);

  if (!dataFetched) {
    return <p>Loading...</p>; // Render nothing until data is fetched
  }

  //console.log(type)
  if (type === "Patient") {
    console.log("fady");
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
          <Route
            path="/DoctorsWithDiscount"
            element={<DoctorsWithDiscount />}
          />
          <Route
            path="/appointmentWalletPayment"
            element={<AppointmentWalletPayment />}
          />
          <Route path="/AddTimeSlots" element={<AddTimeSlots />} />
          <Route path="/AddHealthRecords" element={<AddHealthRecords />} />
          <Route
            path="/PatientHealthRecords/:patientId"
            element={<PatientHealthRecords />}
          />
          <Route
            path="/PatientWallet/:patientName"
            element={<PatientWallet />}
          />
          <Route path="/DoctorWallet/:doctorName" element={<DoctorWallet />} />
          <Route path="/FollowUP/:doctorName" element={<FollowUP />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/HomePageDoc" element={<HomePageDoc />} />

          <Route path="/PatientHP_FM" element={<PatientHP_FM />} />
          {/* <Route path="/PatientAppointments" element={<PatientAppointments />} /> */}
          <Route
            path="/AvailableAppointments/:id"
            element={<AvailableAppointments />}
          />
          <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
        </Routes>
      </div>
    );
  } else if (type === "Doctor") {
    return (
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
        <Route path="/DoctorLogin" element={<Doctorlogin />} />
        <Route path="/AdminLogin" element={<Adminlogin />} />
        <Route path="/PatientLogin" element={<Patientlogin />} />
        <Route path="/ForgetPassword" element={<Forget />} />
        <Route path="/changePassPat" element={<ChangePass />} />
        <Route path="/changePassDoc" element={<ChangePassDoc />} />
        <Route path="/changePassAdm" element={<ChangePassAdm />} />
      </Routes>
    );
  } else if (type === "Admin") {
    return (
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
        <Route path="/DoctorLogin" element={<Doctorlogin />} />
        <Route path="/AdminLogin" element={<Adminlogin />} />
        <Route path="/PatientLogin" element={<Patientlogin />} />
        <Route path="/ForgetPassword" element={<Forget />} />
        <Route path="/changePassPat" element={<ChangePass />} />
        <Route path="/changePassDoc" element={<ChangePassDoc />} />
        <Route path="/changePassAdm" element={<ChangePassAdm />} />
      </Routes>
    );
  } else {
    console.log("asasa");
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerDoctor" element={<DoctorSignup />} />
          <Route path="/registerPatient" element={<PatientSignup />} />
          <Route path="/DoctorLogin" element={<Doctorlogin />} />
          <Route path="/AdminLogin" element={<Adminlogin />} />
          <Route path="/PatientLogin" element={<Patientlogin />} />
          <Route path="/ForgetPassword" element={<Forget />} />
          <Route path="/:any" element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default App;
