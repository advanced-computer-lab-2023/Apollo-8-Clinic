/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
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
import { Alert } from "@mui/material";

import ResponsiveAppBar from './TopBarHome';
import Ads from './Ads';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BottomBar from './BottomBar';

function Home() {
  const navigate = useNavigate();
  const handleDoctorSignup = () => {
    navigate("/registerDoctor");
  };
  const handlePatientSignup = () => {
    navigate("/registerPatient");
  };
  const handleAdminLogin = () => {
    navigate("/HomePageAdmin");
  };
  const handlePatientLogin = () => {
    navigate("/HomePage");
  };
  const handleDoctorLogin = () => {
    navigate("/HomePageDoc");
  };
  // const backgroundStyle = {
  //   backgroundImage: 'url("client/src/images/photo.png")',
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  // };
  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

        <ResponsiveAppBar />
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%' }}>
          <div className="card-body text-center">
            <body>
              <div>
                <button
                  className="btn btn-success m-3 btn-lg"
                  onClick={handleDoctorSignup}
                >
                  DoctorSignup
                </button>
              </div>
              <div>
                <button
                  className="btn btn-success m-3 btn-lg"
                  onClick={handlePatientSignup}
                >
                  PatientSignup
                </button>
              </div>
              <div>
                <button
                  className="btn btn-success m-3 btn-lg"
                  onClick={handleAdminLogin}
                >
                  AdminLogin
                </button>
              </div>
              <div>
                <button
                  className="btn btn-success m-3 btn-lg"
                  onClick={handleDoctorLogin}
                >
                  DoctorLogin
                </button>
              </div>
              <div>
                <button
                  className="btn btn-success m-3 btn-lg"
                  onClick={handlePatientLogin}
                >
                  PatientLogin
                </button>
              </div>
            </body>
          </div>
        </div>
        <BottomBar />
      </AppBar >
    </div >);
}

export default Home;
