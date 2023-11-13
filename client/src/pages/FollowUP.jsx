// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/SidebarDoctor";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import "../App.css";

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { height } from '@mui/system';
import imgSrc from "../images/back.jpg"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import ResponsiveAppBar from './TopBarDoc';
import Ads from './Ads';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BottomBar from './BottomBar';



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
        { appointmentId: appointment._id, newType: newType }
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
    <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

        <ResponsiveAppBar />
        <div style={{ backgroundColor: " rgb(65, 105, 225)", borderRadius: '50px', margin: '10px', width: '40%', marginLeft: '30%' }}>
          <h1 style={{ font: "Arial", fontWeight: 'bold', color: "white", margin: "10px" }}>
            Follow Up</h1>

        </div>
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%' }}>

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
        <BottomBar />

      </AppBar>

    </div >);
}

export default FollowUP;