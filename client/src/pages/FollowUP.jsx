// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/SidebarDoctor";

function FollowUP() {
    
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const doctorName = "helen";
    
    useEffect(() => {
      axios
        .get(`http://localhost:8000/appointment/${doctorName}`)
        .then((response) => {
          console.log("API Response:", response.data);
          setAppointments(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          setLoading(false);
        });
    }, [doctorName]);

    const handleUpdateAppointment = async (appointment) => {
        let newType = 'follow up';
        try {
          const response = await axios.put(
            `http://localhost:8000/doctor/updateAppointment/${appointment.doctorId.name}`,
            {appointmentId: appointment._id, newType: newType}
          );
          if (
            response.data
          ) {
            setAppointments((prevAppointments) =>
                prevAppointments.map((prevAppointment) =>
                    prevAppointment._id === appointment._id
                    ? { ...prevAppointment, type: newType }
                    : prevAppointment
                )
                );
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Sidebar />
        <div className="card m-3 col-12" style={{ width: "80%" }}>
          <div className="card-header">
            <h2>FollowUP</h2>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{appointment.patientId?.name}</td>
                        <td>{appointment.doctorId?.name}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.status}</td>
                        <td>{appointment.type}</td>
                        <td>
                          <button className="btn btn-success"
                          onClick={() => handleUpdateAppointment(appointment)}>
                            Follow Up 
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No appointments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default FollowUP;