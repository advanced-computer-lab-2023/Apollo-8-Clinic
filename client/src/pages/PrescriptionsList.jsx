import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/SidebarPatient";
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
import { height } from '@mui/system';
import imgSrc from "../images/photo.png"
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
import { Alert } from "@mui/material";

import ResponsiveAppBar from './TopBar';
import Ads from './Ads';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BottomBar from "./BottomBar";



function PrescriptionsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const name = useRef(null);
  const date = useRef(null);
  const status = useRef(null);
  const filter = useRef(null);

  useEffect(() => {
    const apiUrl =
      "http://localhost:8000/patient/getPerscriptions?patientId=6523ba9cd72b2eb0e39cb137";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function handleClick() {
    let body = { patientId: "6523ba9cd72b2eb0e39cb137" };
    if (name.current.checked) {
      body = {
        ...body,
        doctorName: filter.current.value,
      };
    } else if (date.current.checked) {
      body = {
        ...body,
        date: filter.current.value,
      };
    } else {
      body = {
        ...body,
        state: filter.current.value,
      };
    }
    const apiUrl = "http://localhost:8000/patient/filterPerscriptions";
    axios
      .post(apiUrl, body)
      .then((result) => {
        setData(result.data);
        console.log(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/prescriptions/${id}`);
  }

  const listo = data.map((user, i) => {
    console.log(user);
    return (
      <div key={i} style={{ width: 400, display: "inline-flex" }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Prescription number {i}</h5>
            <p className="card-text">Doctor Name is :{user.doctorId.name}</p>
            <p className="card-text">Date is :{user.date}</p>
            <button
              onClick={() => handleView(user._id)}
              type="button"
              className="btn btn-primary"
            >
              See Prescription details
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
        <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto", }}>
          <ResponsiveAppBar />
          <div className="card m-3 col-12" style={{ width: "80%" }}>
            <div>
              <div className="form-check">
                <input
                  ref={name}
                  className="form-check-input"
                  value="lolos"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  style={{ paddingRight: "80%" }}
                  className="form-check-label"
                  htmlFor="flexRadioDefault1"
                >
                  Filter By doctor name
                </label>
              </div>
              <div className="form-check">
                <input
                  ref={date}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label
                  style={{ paddingRight: "80%" }}
                  className="form-check-label"
                  htmlFor="flexRadioDefault2"
                >
                  Filter by date
                </label>
              </div>
              <div className="form-check">
                <input
                  ref={status}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  checked
                />
                <label
                  style={{ paddingRight: "80%" }}
                  className="form-check-label"
                  htmlFor="flexRadioDefault3"
                >
                  Filter by status
                </label>
              </div>

              <div className="input-group mb-3" style={{ width: 250 }}>
                <input
                  type="text"
                  ref={filter}
                  name="patientId"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  filter
                </button>
              </div>
            </div>

            <div className="image">{listo}</div>
          </div>
        </AppBar >
      </div >
    </>
  );
}

export default PrescriptionsList;
