import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import DoctorSignup from "./pages/auth/DoctorSignup";
import PatientSignup from "./pages/auth/PatientSignup";
import Home from "./pages/Home";
import PrescriptionsList from "./pages/patient/PrescriptionsList";
import EditDoctor from "./pages/doctor/EditDoctor";
import AllDoctors from "./pages/patient/AllDoctors";
import DoctorInfo from "./pages/patient/DoctorInfo";
import ViewDoctor from "./pages/patient/ViewDoctor";
import FilterDoctor from "./pages/patient/FilterDoctor";
//youhanna milestone 2222
import Doctorlogin from "./pages/auth/DoctorLogin";
import Adminlogin from "./pages/auth/AdminLogin";
import Patientlogin from "./pages/auth/PatientLogin";
import Forget from "./pages/auth/ForgetPassword";
import ChangePass from "./pages/patient/chnagePass";
import ChangePassDoc from "./pages/doctor/changePassDoc";
import ChangePassAdm from "./pages/admin/changePassAdm";

import AppPatient from "./pages/patient/patientFamApp";
import MyPatientsList from "./pages/doctor/MyPatientsList";
import UpcomingAppointments from "./pages/doctor/UpcomingAppointments";
import AddAdmin from "./pages/admin/AddAdmin";
import RemoveUser from "./pages/admin/RemoveUser";
import PendingDoctors from "./pages/admin/PendingDoctors";
import DoctorDetails from "./pages/admin/DoctorDetails";
import Health from "./pages/doctor/ViewHealthRecords";
import AddTimeSlots from "./pages/doctor/AddTimeSlots";
import AddHealthRecords from "./pages/doctor/AddHealthRecords";
import PatientHealthRecords from "./pages/patient/PatientHealthRecords";
import MainDoctor from "./pages/doctor/DoctorAppointments";
import App1 from "./pages/admin/adminHealthP";
import PrescriptionsDetails from "./pages/patient/PrescriptionDetails";
//apply sessDiscount for patients
import DoctorsWithDiscount from "./pages/patient/DoctorsWithDiscount";
import AppointmentWalletPayment from "./pages/patient/AppointmentWalletPayment";
import PatientWallet from "./pages/patient/PatientWallet";
import DoctorWallet from "./pages/doctor/DoctorWallet";
import FollowUP from "./pages/doctor/FollowUP";
import HomePage from "./pages/patient/HomePage";
import HomePageDoc from "./pages/doctor/HomePageDoc";
import PatientHP_FM from "./pages/patient/PatientFamilyHP";
import PatientAppointments from "./pages/patient/PatientAppointments";
import AvailableAppointments from "./pages/patient/AvailableAppointments";
import HomePageAdmin from "./pages/admin/HomePageAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import DoctorContract from "./pages/doctor/DoctorContract";
import FollowUPPending from "./pages/doctor/FollowUPPending";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


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
    return <CircularProgress color="success" />
      ; // Render nothing until data is fetched
  }

  //console.log(type)
  if (type === "Patient") {
    console.log("fady");
    return (
      <div>
        <Routes>
          <Route path="/prescriptionsList" element={<PrescriptionsList />} />
          <Route path="/prescriptions/:id" element={<PrescriptionsDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/allDoctors" element={<AllDoctors />} />
          <Route path="/doctorInfo/:id" element={<DoctorInfo />} />
          <Route path="/viewDoctor/:id" element={<ViewDoctor />} />
          <Route path="/filter" element={<FilterDoctor />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          {/* this doctor details is in admin */}
          <Route path="/patientFamilyAppointments" element={<AppPatient />} />
          <Route
            path="/DoctorsWithDiscount"
            element={<DoctorsWithDiscount />}
          />
          <Route
            path="/appointmentWalletPayment"
            element={<AppointmentWalletPayment />}
          />
          <Route
            path="/PatientHealthRecords/:patientId"
            element={<PatientHealthRecords />}
          />
          <Route
            path="/PatientWallet/:patientName"
            element={<PatientWallet />}
          />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/PatientHP_FM" element={<PatientHP_FM />} />
          {/* <Route path="/PatientAppointments" element={<PatientAppointments />} /> MYRIAM*/}
          <Route
            path="/AvailableAppointments/:id"
            element={<AvailableAppointments />}
          />
          <Route path="/ForgetPassword" element={<Forget />} />
          <Route path="/changePassPat" element={<ChangePass />} />
        </Routes>
      </div>
    );
  } else if (type === "Doctor") {
    return (
      <Routes>
        <Route path="/editDoctor" element={<EditDoctor />} />
        <Route path="/" element={<Home />} />
        <Route path="/AddHealthRecords/:id" element={<AddHealthRecords />} />

        <Route path="/DoctorWallet/:doctorName" element={<DoctorWallet />} />
        <Route path="/FollowUP/:doctorName" element={<FollowUP />} />
        <Route path="FollowUPPending/:doctorName" element={<FollowUPPending />} />
        <Route path="/AddTimeSlots" element={<AddTimeSlots />} />

        <Route path="/HomePageDoc" element={<HomePageDoc />} />

        <Route path="/viewMyPatients" element={<MyPatientsList />} />
        <Route path="/viewUpcomingApp" element={<UpcomingAppointments />} />
        <Route path="/contract" element={<DoctorContract />} />

        <Route path="/doctorAppointments" element={<MainDoctor />} />
        <Route path="/viewHealth/:patientID" element={<Health />} />
        <Route path="/ForgetPassword" element={<Forget />} />
        <Route path="/changePassDoc" element={<ChangePassDoc />} />
      </Routes>
    );
  } else if (type === "Admin") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addAdministrator" element={<AddAdmin />} />
        <Route path="/removeUser" element={<RemoveUser />} />
        <Route path="/pendingDoctors" element={<PendingDoctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/adminHealthPackage" element={<App1 />} />
        <Route path="/ForgetPassword" element={<Forget />} />
        <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
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
