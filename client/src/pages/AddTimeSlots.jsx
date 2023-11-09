// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarAdmin";

function AddTimeSlots() {
  const [availableSlots, setAvailableSlots] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/doctor/add-available-time-slot", {
        doctorId: "6527c67e46e93ddb9af7b73f",
        availableSlots: [availableSlots],
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error adding available time slots:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Sidebar />
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <h2>Add Available Time Slots</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="availableSlots">
              <strong>Available Slots</strong>
            </label>
            <input
              type="text"
              placeholder="Enter available slots"
              autoComplete="off"
              name="availableSlots"
              className="form-control rounded-0"
              value={availableSlots}
              onChange={(e) => setAvailableSlots(e.target.value)}
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

export default AddTimeSlots;