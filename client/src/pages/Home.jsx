/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleDoctorSignup = () => {
    navigate("/registerDoctor");
  };
  const handlePatientSignup = () => {
    navigate("/registerPatient");
  };
  const backgroundStyle = {
    backgroundImage: 'url("client/src/images/photo.png")', 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light" style={backgroundStyle}>
      <div className="card m-3 col-12" style={{ width: "80%" }}>
      <div className="card-body text-center">
        <body>
         <div><button className="btn btn-success m-3 btn-lg"
          onClick={handleDoctorSignup} >DoctorSignup</button></div>
         <div><button className="btn btn-success m-3 btn-lg"
          onClick={handlePatientSignup}>PatientSignup</button></div>
         <div><button className="btn btn-success m-3 btn-lg"
         >AdminLogin</button></div>
         <div><button className="btn btn-success m-3 btn-lg"
          >DoctorLogin</button></div>
         <div><button className="btn btn-success m-3 btn-lg"
          >PatientLogin</button></div>
         

</body>
</div>
</div>
</div>
       );
}


export default Home;