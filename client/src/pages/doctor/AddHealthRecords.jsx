// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../../components/TopBarDoc";
import BottomBar from "../../components/BottomBar";

function AddHealthRecords() {
  const [file, setFile] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/doctor/addHealthRecords",
        {
          doctorId: "6527c67e46e93ddb9af7b73f",
          patientId: id,
          date,
          description,
          file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding health records:", error);
    }
  };

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
          style={{
            backgroundColor: " rgb(65, 105, 225)",
            borderRadius: "50px",
            margin: "10px",
            width: "40%",
            marginLeft: "30%",
          }}
        >
          <h1
            style={{
              font: "Arial",
              fontWeight: "bold",
              color: "white",
              margin: "10px",
            }}
          >
            Add Health Records
          </h1>
        </div>
        <div
          className="card m-3 col-12"
          style={{ width: "80%", borderRadius: "20px", left: "8%" }}
        >
          <form onSubmit={handleSubmit}>
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
                onClick={handleSubmit}
                type="submit"
                class="btn btn-primary"
              >
                add
              </button>
            </div>
          </form>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default AddHealthRecords;
