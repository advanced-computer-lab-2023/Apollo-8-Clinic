// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
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
    <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

        <ResponsiveAppBar />
        <div style={{ backgroundColor: " rgb(65, 105, 225)", borderRadius: '50px', margin: '10px', width: '40%', marginLeft: '30%' }}>
          <h1 style={{ font: "Arial", fontWeight: 'bold', color: "white", margin: "10px" }}>
            Add Health Records</h1>

        </div>
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%' }}>

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
        <BottomBar />

      </AppBar >

    </div >
  );
}

export default AddHealthRecords;