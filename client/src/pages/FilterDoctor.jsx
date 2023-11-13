import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarAdmin";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import "../App.css";
import Button1 from 'react-bootstrap/Button';
import Card1 from 'react-bootstrap/Card';
import famImg from '../images/famclinic.png';
import hpImg from '../images/clinicHP.png';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

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
import { Alert } from "@mui/material";

import ResponsiveAppBar from "./TopBar";
import Ads from './Ads';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BottomBar from './BottomBar';
import axios from "axios";



function FilterDoctors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTime, setSearchTime] = useState(null);
  const [searchSpec, setSearchSpec] = useState("");
  const [hp, setHp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const patientApiUrl =
      "http://localhost:8000/patient/getPatientHealthPackage/" +
      "6523ba9cd72b2eb0e39cb137";
    axios
      .get(patientApiUrl)
      .then((response) => {
        setHp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    const apiUrl = "http://localhost:8000/patient/allDoctors";
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
  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    console.log(id);
    navigate(`/viewDoctor/${id}`);
    console.log(id);
  }
  function handleFilter() {
    // const response= await axios.get("http://localhost:8000/patient/allDoctors");
    console.log(searchTime);
    console.log(searchSpec);
    axios
      .post("http://localhost:8000/patient/docFilter", {
        searchTime,
        searchSpec,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data); // Set the content to MainContent with the appointments data
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function getSessionPrice(hourlyRate) {
    if (hp)
      return hourlyRate + hourlyRate * 0.1 - hourlyRate * hp[0].sessDiscount;
    else return hourlyRate + hourlyRate * 0.1;
  }
  return (
    < div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

        <ResponsiveAppBar />
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%', display: 'flex' }}>

          <div className="card-header">
            <h2>All Doctors Details</h2>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>speciality</th>
                    <th>Session Price</th>
                    <th>
                      <input
                        type="text"
                        placeholder="filter by available slots"
                        autoComplete="off"
                        name="time"
                        className="form-control rounded-0"
                        onChange={(e) => setSearchTime(e.target.value)}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder="filter by a spciality"
                        autoComplete="off"
                        name="spec"
                        className="form-control rounded-0"
                        onChange={(e) => setSearchSpec(e.target.value)}
                      />
                    </th>
                    <th>
                      <button
                        style={{ backgroundColor: " rgb(65, 105, 225)" }}
                        className="btn btn-success"
                        onClick={() => handleFilter()}
                      >
                        apply filter on speciality and available slots
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.speciality}</td>
                      <td>{getSessionPrice(item.hourlyRate)}</td>
                      <td></td>
                      <td></td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleView(item._id)}
                          style={{ backgroundColor: " rgb(65, 105, 225)" }}
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <BottomBar />
      </AppBar >
    </div >);
}

export default FilterDoctors;
