import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarPatient";
import img1 from "../images/photo.png";
//import img2 from '../images/'
function PatientHealthRecords() {
  console.log("Component rendered");
  const [loading, setLoading] = useState(true);
  const [records, setHealthRecords] = useState([]);

  // Manually set the patient ID
  const patientId = "652f955bdea721b31ef04335";

  useEffect(() => {
    const apiUrl = `http://localhost:8000/patient/health-records/${patientId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data) {
          console.log(response.data); // Log the response to the console
          setHealthRecords(response.data.records);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [patientId]);
  const list = records.map((record) => (
    <div
      key={record._id}
      className="card"
      style={{
        width: 300,
        margin: 50,
        border: "5px solid ",
        borderColor: "black",
      }}
    >
      <img
        style={{ height: 200, width: 200 }}
        src={record.image_url || img1}
        className="card-img-top"
      />
      <div className="card-body">
        <p className="card-text">Description: {record.description}</p>
        <p className="card-text">Date: {record.date}</p>
      </div>
    </div>
  ));

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <div className="card-header">
          <h2>My Health Records</h2>
        </div>
        <div className="card-body">
          <div className="image">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
                {list}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHealthRecords;
