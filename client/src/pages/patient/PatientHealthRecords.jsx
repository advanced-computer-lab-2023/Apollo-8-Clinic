import { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBar.jsx";
import BottomBar from "../../components/BottomBar.jsx";
import axios from "axios";
import config from "../../config/config.js";
import img1 from "../../images/photo.png";
//import img2 from '../images/'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


function PatientHealthRecords() {
  console.log("Component rendered");
  const [loading, setLoading] = useState(true);
  const [records, setHealthRecords] = useState([]);
  const [file, setFile] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
  const change2 = useRef(null);

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
  useEffect(() => {
    // Enable the upload button only if date, description, and file are not empty
  setUploadButtonDisabled(!date || !description || !file);
}, [date, description, file]);


  const handleAddMedicalHistory = (e) => {
    e.preventDefault();
    if (!date || !description || !file) {
      // Display a message or perform any other action to inform the user about the missing fields
      return;
    }

    axios
      .put(
        " http://localhost:8000/patient/health-records",
        {
          date,
          description,
          file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((result) => {
        if (result.status === 200) {
          setHealthRecords(result.data.health_records.records);
          setLoading(false);
          // Reset the form fields
          setDate("");
          setDescription("");
          setFile(null);
          change2.current.style.display = "block";
          setTimeout(() => {
            change2.current.style.display = "none";
          }, 5000);
        }
      })
      
      .catch((err) => console.log(err));
  };

  const handleRemoveMedicalHistory = (id) => {
    axios
      .post("http://localhost:8000/patient/remove-health-records", {
        id,
      })
      .then(() => {
        // Remove the record from the frontend
        setHealthRecords((prevRecords) => prevRecords.filter(record => record._id !== id));
      })
      .catch((err) => console.log(err));
  };

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
        src={config.STORAGE_URL + record.image || img1}
        className="card-img-top"
      />
      <div className="card-body">
        <p className="card-text">Description: {record.description}</p>
        <p className="card-text">Date: {record.date}</p>
      </div>
      <button
        onClick={() => handleRemoveMedicalHistory(record._id)}
        class="btn btn-danger"
      >
        remove
      </button>
    </div>
  ));

  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%" }}>
      <AppBar
        style={{
          height: "100%",
          backgroundColor: "#F0F0F0",
          overflowY: "auto",
        }}
      >
        <ResponsiveAppBar />
        <div
          className="card m-3 col-12"
          style={{
            width: "80%",
            borderRadius: "20px",
            left: "8%",
            display: "flex",
          }}
        >
          <div className="card-header">
            <h2>My Health Records</h2>
          </div>
          <div ref={change2} style={{ display: "none" }}>
            <div
               style={{
                height: "50px",
                backgroundColor: "green", // Set the background color to green
                color: "white", // Set the text color to white
                display: "flex",
                
              
              }}
              className="alert alert-primary d-flex align-items-center"
              role="alert"
            >
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:">
                <use xlink: href="#info-fill" />
              </svg>
              <div>health record uploaded successfully!</div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label>
                <strong>Date</strong>
              </label>
              <input
                type="date"
                className="form-control rounded-0"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>
                <strong>Description</strong>
              </label>
              <input
                type="text"
                placeholder="enter description"
                className="form-control rounded-0"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>
                <strong>document</strong>
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              onClick={handleAddMedicalHistory}
              type="submit"
              class="btn btn-primary"
              disabled={uploadButtonDisabled}
            >
              upload
            </button>
          </div>
          <div className="card-body">
            <div className="image">
            {loading ? (
          <CircularProgress color="success" />
        ) : records.length === 0 ? (
          <p style={{ color: "red" }}>No health records available.</p>
        ) : (
          <div className="image" style={{ display: "inline-flex", flexWrap: "wrap" }}>
            {list}
          </div>
        )}
      </div>
          </div>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default PatientHealthRecords;
