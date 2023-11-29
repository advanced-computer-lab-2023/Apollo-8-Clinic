import { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBarDoc";
import BottomBar from "../../components/BottomBar";

function AddTimeSlots() {
  const [availableSlots, setAvailableSlots] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/doctor/add-available-time-slot",
        {
          doctorId: "6526653e47c45e179aa6886b",
          availableSlots: [availableSlots],
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding available time slots:", error);
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
            Add Time Slots
          </h1>
        </div>
        <div
          className="card m-3 col-12"
          style={{ width: "80%", borderRadius: "20px", left: "8%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="availableSlots">
                <strong>Available Slots</strong>
              </label>
              <h6>format: 05/05/2001 17:00:00</h6>
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
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default AddTimeSlots;
