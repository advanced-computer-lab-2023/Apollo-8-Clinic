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

import img1 from '../images/admin.png'
import img2 from '../images/doc.png'
import img3 from '../images/pat.png'
import img4 from '../images/docsign.jpeg'
import img5 from '../images/docSignUp.jpeg'



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
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%', display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <Card1 style={{ width: '18rem', marginRight: '10%' }}>
              <Card1.Img variant="top" src={img3} alt="health package.png" />
              <Card1.Body>
                <Card1.Title>Patient Login</Card1.Title>

                <Button1 variant="primary" onClick={handlePatientLogin}>Login</Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: '18rem', marginRight: '10%' }}>
              <Card1.Img variant="top" src={img2} alt="family.png" />
              <Card1.Body>
                <Card1.Title style={{ marginTop: '45px' }}>Doctor Login</Card1.Title>

                <Button1 variant="primary" style={{}} onClick={handleDoctorLogin}>Login</Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: '18rem' }}>
              <Card1.Img variant="top" src={img1} alt="family.png" />
              <Card1.Body>
                <Card1.Title>Admin Login</Card1.Title>

                <Button1 variant="primary" onClick={handleAdminLogin}>Login</Button1>
              </Card1.Body>
            </Card1>

          </div>
          <br />
          <br />
          <div style={{ display: 'flex' }}>
            <Card1 style={{ width: '18rem', marginRight: '11%', marginLeft: '18%' }}>
              <Card1.Img variant="top" src={img4} alt="health package.png" />
              <Card1.Body>
                <Card1.Title>Patient SignUp</Card1.Title>

                <Button1 variant="primary" onClick={handlePatientSignup}>Sign Up</Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: '18rem' }}>
              <Card1.Img variant="top" src={img5} alt="family.png" />
              <Card1.Body>
                <Card1.Title>Doctor SignUp</Card1.Title>

                <Button1 variant="primary" onClick={handleDoctorSignup}>Sign Up</Button1>
              </Card1.Body>
            </Card1>


          </div>
        </div>
        <BottomBar />
      </AppBar >
    </div >);
}

export default Home;
