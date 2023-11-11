import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
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


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/patient/appointmentWithFilter")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div style={{ overflow: "auto", height: 440 }}>
      {appointments.map((member) => (
        <div
          key={member.id}
          style={{ border: "1px solid black", borderRadius: 5 }}
        >
          <p>
            <strong>Doctor ID:</strong> {member.doctorId}
          </p>
          <p>
            <strong>patient ID:</strong> {member.patientId}
          </p>
          <p>
            <strong>Date:</strong> {member.date}
          </p>
          <p>
            <strong>status:</strong> {member.status}
          </p>
        </div>
      ))}
    </div>
  );
};

const AppointmentFilterPage = ({ appointments }) => {
  console.log(appointments);
  return (
    <div style={{ overflow: "auto", height: 440 }}>
      {appointments.map((member) => (
        <div
          key={member.id}
          style={{ border: "1px solid black", borderRadius: 5 }}
        >
          <p>
            <strong>Doctor ID:</strong> {member.doctorId}
          </p>
          <p>
            <strong>patient ID:</strong> {member.patientId}
          </p>
          <p>
            <strong>Date:</strong> {member.date}
          </p>
          <p>
            <strong>status:</strong> {member.status}
          </p>
        </div>
      ))}
    </div>
  );
};

const Header = () => (
  <div
    style={{ width: "100%", border: "1px solid black", textAlign: "center" }}
  >
    <h1>MY CLINIC</h1>
  </div>
);

//<button style={{width: '100%', height:40}} onClick={() => {changeContent(<Buttons />);setShowForm(false);}}>Health Packages</button>
const Sidebar1 = ({
  changeContent,
  showForm,
  setShowForm,
  showHello,
  setShowHello,
}) => (
  <div
    style={{
      width: "20%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
    }}
  >
    <div
      id="welcomeTitle"
      style={{
        border: "1px solid black",
        height: 80,
        fontSize: 25,
        borderRadius: 10,
        textAlign: "center",
      }}
    >
      Welcome Doctor
    </div>
    <button
      style={{ width: "100%", height: 40 }}
      onClick={() => {
        changeContent(<Appointments />);
        setShowHello(true);
      }}
    >
      Appointments
    </button>
  </div>
);

const MainContent = ({ content }) => (
  <div
    style={{
      width: "60%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
    }}
  >
    {content}
  </div>
);

const Footer = () => (
  <div
    style={{ width: "100%", border: "1px solid black", textAlign: "center" }}
  >
    <p>Contact us on (+100)123456788 or by email clinic@gmail.com</p>
  </div>
);

const RightSidebar = ({ showForm, showHello }) => (
  <div
    style={{
      width: "20%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
    }}
  ></div>
);

const MainDoctor = () => {
  const [content, setContent] = useState("Click a button to change content");
  const [showHello, setShowHello] = useState(false);

  //search appointments
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const doctorId = "6526653e47c45e179aa6886b";

  const searchApp = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/doctor/appointmentWithFilter", {
        startDate,
        endDate,
        status,
        doctorId,
      })
      .then((response) => {
        console.log(response.data);
        setContent(<AppointmentFilterPage appointments={response.data} />); // Set the content to MainContent with the appointments data
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log(content);
  };

  return (
    <>
      <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
        <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

          <ResponsiveAppBar />
          <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%' }}>
            <Header />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "calc(100vh - 100px)",
              }}
            >
              <Sidebar1
                changeContent={setContent}
                showHello={showHello}
                setShowHello={setShowHello}
              />
              <MainContent content={content} />
              <div
                style={{
                  width: "20%",
                  height: "calc(100vh - 100px)",
                  border: "1px solid black",
                }}
              >
                {showHello && (
                  <form>
                    <h2>Appointments</h2>
                    <label>
                      Start Date:
                      <input
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </label>
                    <label>
                      End Date:
                      <input
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </label>
                    <label>
                      Status:
                      <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </label>
                    <button type="button" onClick={searchApp}>
                      Apply Filter
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          <BottomBar />

        </AppBar >

      </div >
      <Footer />
    </>
  );
};
//for the doctor
// ReactDOM.render(<MainDoctor />, document.getElementById('root'));

export default MainDoctor;
