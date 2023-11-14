import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarAdmin";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import "../App.css";
import Button1 from "react-bootstrap/Button";
import Card1 from "react-bootstrap/Card";
import famImg from "../images/famclinic.png";
import hpImg from "../images/clinicHP.png";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

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
import imgSrc from "../images/back.jpg";
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
import axios from "axios";
import config from "../config/config.js";

import img1 from "../images/photo.png";
//import img2 from '../images/'
function PatientHealthRecords() {
  console.log("Component rendered");
  const [loading, setLoading] = useState(true);
  const [records, setHealthRecords] = useState([]);
  const [file, setFile] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
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

  const handleAddMedicalHistory = (e) => {
    e.preventDefault();
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
          change2.current.style.display = "block";
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveMedicalHistory = (id) => {
    axios
      .put(" http://localhost:8000/patient/remove-health-records", {
        id,
      })
      .then(() => {})
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
              style={{ height: "50px" }}
              class="alert alert-primary d-flex align-items-center"
              role="alert"
            >
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:">
                <use xlink:href="#info-fill" />
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
            >
              upload
            </button>
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
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default PatientHealthRecords;
