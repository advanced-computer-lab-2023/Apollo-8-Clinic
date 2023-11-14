import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SidebarPatient";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import "../App.css";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { height } from "@mui/system";
import imgSrc from "../images/photo.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Alert } from "@mui/material";

import ResponsiveAppBar from "./TopBar";
import Ads from "./Ads";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BottomBar from "./BottomBar";
import { useNavigate } from "react-router-dom";

const Appointments = (patientID) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/appointment/getPatientAppointments/" +
          patientID.patientID
      )
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);


  function handleWalletPayment() {
    window.location.href = "/appointmentWalletPayment";
  }
  const handleCreditCardPayment = () => {
    //window.location.href = '/appointmentCreditCardPayment' ;
    axios
      .post("http://localhost:8000/AppointmentCheckout")
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div style={{ overflow: "auto", height: 440 }}>
      {appointments.map((member) => (
        <div
          key={member.id}
          style={{
            border: "1px solid black",
            borderRadius: "20px",
          }}
        >
          <p>
            <strong>Doctor ID:</strong> {member.doctorId}
          </p>

          <p>
            <strong>Date:</strong> {member.date}
          </p>
          <p>
            <strong>status:</strong> {member.status}
          </p>
          <p>
            <button
              className="btn btn-success m-3 btn-sm"
              onClick={handleWalletPayment}
            >
              Pay using wallet
            </button>
            <form
              action="http://localhost:8000/AppointmentCheckout"
              method="POST"
            >
              <button className="btn btn-success m-3 btn-sm">
                Pay using credit card
              </button>
            </form>
          </p>

        </div>
      ))}
    </div>
  );
};




function handleWalletPayment() {
  window.location.href = "/appointmentWalletPayment";
}





const handleCreditCardPayment = () => {
  //window.location.href = '/appointmentCreditCardPayment' ;
  axios
    .post("http://localhost:8000/AppointmentCheckout")
    .then((response) => {})
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};




const AppointmentFilterPage = ({ appointments }) => {
  const navigate = useNavigate();
  console.log(appointments);
  return (
    <div style={{ overflow: "auto", height: 440 }}>
      {appointments.map((member) => (
        <div
          key={member.id}
          style={{
            border: "1px solid black",
            borderRadius: "20px",
          }}
        >
          <p>
            <strong>Doctor ID:</strong> {member.doctorId}
          </p>

          <p>
            <strong>Date:</strong> {member.date}
          </p>
          <p>
            <strong>status:</strong> {member.status}
          </p>
          <p>
            <button
              className="btn btn-success m-3 btn-sm"
              onClick={handleWalletPayment}
            >
              Pay using wallet
            </button>
            <form
              action="http://localhost:8000/AppointmentCheckout"
              method="POST"
            >
              <button className="btn btn-success m-3 btn-sm">
                Pay using credit card
              </button>
            </form>
          </p>
        </div>
      ))}
    </div>
  );
};

const Header = () => (
  <div
    style={{
      backgroundColor: " rgb(65, 105, 225)",
      borderRadius: "50px",
      margin: "10px",
      width: "40%",
      marginLeft: "30%",
    }}
  ></div>
);

const Buttons = () => (
  <div>
    <button>Add</button>
    <button>Delete</button>
    <button>Update</button>
  </div>
);

const Sidebar1 = ({
  changeContent,
  showForm,
  setShowForm,
  showHello,
  setShowHello,
  id,
}) => {
  const [TakenID, setTakenID] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  return (
    <div
      style={{
        width: "30%",
        height: "calc(100vh - 100px)",
        border: "1px solid black",
        borderRadius: "20px",
      }}
    >
      <button
        className="btn btn-success w-100"
        style={{
          width: "100%",
          height: 40,
          backgroundColor: " rgb(65, 105, 225)",
          borderRadius: "20px",
        }}
        onClick={() => {
          changeContent(<Appointments patientID={id} />);
          setShowForm(false);
          setShowHello(true);
        }}
      >
        Appointments
      </button>
    </div>
  );
};

const MainContent = ({ content }) => (
  <div
    style={{
      width: "60%",
      height: "calc(100vh - 100px)",
      border: "1px solid black",
      borderRadius: "20px",
    }}
  >
    {content}
  </div>
);

const Footer = () => (
  <div
    style={{
      width: "100%",
      border: "1px solid black",
      textAlign: "center",
      borderRadius: "20px",
    }}
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
      borderRadius: "20px",
    }}
  ></div>
);

const AppPatient = () => {
  const [content, setContent] = useState("Click a button to change content");
  const [showHello, setShowHello] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [TakenID, setTakenID] = useState("");

  //add a new family member
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [relation, setRelation] = useState("");

  //search appointments
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  ///////////
  const patientId = "6522b24e238a2bbfc0ceeb6e";

  const searchApp = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/doctor/appointmentWithFilter", {
        startDate,
        endDate,
        status,
        patientId,
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
              Welcome Patient
            </h1>
          </div>
          <div
            className="card m-3 col-12"
            style={{ width: "90%", left: "3%", borderRadius: "20px" }}
          >
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
                showForm={showForm}
                setShowForm={setShowForm}
                showHello={showHello}
                setShowHello={setShowHello}
                id={patientId}
              />
              <MainContent content={content} />
              <div
                style={{
                  width: "30%",
                  height: "calc(100vh - 100px)",
                  border: "1px solid black",
                  borderRadius: "20px",
                }}
              >
                {showHello && (
                  <form>
                    <h2
                      style={{
                        backgroundColor: " rgb(65, 105, 225)",
                        color: "white",
                        marginBottom: "20px",
                        height: "50px",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Appointments
                    </h2>
                    <label style={{ marginBottom: "10px" }}>
                      Start Date:
                      <input
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          height: "40px",
                        }}
                        type="text"
                        placeholder="  Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </label>
                    <label style={{ marginBottom: "10px" }}>
                      End Date:
                      <input
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          height: "40px",
                        }}
                        placeholder="  End Date"
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </label>
                    <label style={{ marginBottom: "10px" }}>
                      Status:
                      <input
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                          height: "40px",
                        }}
                        placeholder="  Example: Pending"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-success m-3 btn-sm"
                      style={{
                        marginTop: "5%",
                        width: "50%",
                        fontSize: "16px",
                      }}
                      onClick={searchApp}
                    >
                      Apply Filter
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          <BottomBar />
        </AppBar>
      </div>
    </>
  );
};
//for the patient
//ReactDOM.render(<App />, document.getElementById('root'));

export default AppPatient;
