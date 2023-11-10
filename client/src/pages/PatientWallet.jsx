import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarPatient";

function PatientWallet() {
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState(null);
    const [error, setError] = useState(null);
    // Manually set the patient ID
    const patientName = "roger";
  
    useEffect(() => {
        const apiUrl = `http://localhost:8000/patient/getWallet/${patientName}`;
      
        axios
          .get(apiUrl)
          .then((response) => {
            console.log("API Response:", response.data);
            setWallet(response.data); // Assuming response.data.wallet is a number
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setError(error.message || "An error occurred");
            setLoading(false);
          });
      }, [patientName]);
  
    
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Sidebar />
  
        <div className="card m-3 col-12" style={{ width: "80%" }}>
  <div className="card-header">
    <h2>My wallet</h2>
  </div>
  <div className="card-body">
  {loading ? (
  <p>Loading...</p>
) : error ? (
  <p>Error: {error}</p>
) : (
  <div>${wallet}</div>
)}
  </div>
</div>
      </div>
    );
  }
  
  export default PatientWallet;