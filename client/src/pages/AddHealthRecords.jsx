// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarDoctor";

function AddHealthRecords() {
    const [healthRecords, setHealthRecords] = useState({
        description: "",
        image_url: "",
        date: "",
      });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/doctor/addHealthRecords", {
        doctorId: "6527c67e46e93ddb9af7b73f",
        patientId: "654c00da2abe329de5810285"
        ,
        health_records: {
            records: [healthRecords],
          },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error adding health records:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Sidebar />
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <h2>Add Health Records</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description">
              <strong>Description</strong>
            </label>
            <input
              type="text"
              placeholder="Enter description"
              autoComplete="off"
              name="description"
              className="form-control rounded-0"
              value={healthRecords.description}
              onChange={(e) => setHealthRecords({ ...healthRecords, description: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image_url">
              <strong>Image URL</strong>
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              autoComplete="off"
              name="image_url"
              className="form-control rounded-0"
              value={healthRecords.image_url}
              onChange={(e) => setHealthRecords({ ...healthRecords, image_url: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date">
              <strong>Date</strong>
            </label>
            <input
              type="date"
              name="date"
              className="form-control rounded-0"
              value={healthRecords.date}
              onChange={(e) => setHealthRecords({ ...healthRecords, date: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHealthRecords;