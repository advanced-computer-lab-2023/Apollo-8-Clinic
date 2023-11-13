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

function PrescriptionsDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicin] = useState([]);
  const [size, setSize] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const apiUrl = "http://localhost:8000/patient/getPerscription/" + id;
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setMedicin(response.data.medicine);
        setSize(response.data.medicine.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const listo = medicine.map((user, i) => {
    console.log(user);
    return (
      <div key={i} className="card" style={{ width: 200, margin: 50 }}>
        <img
          style={{ height: 300, width: 200 }}
          src="https://static.vecteezy.com/system/resources/previews/019/807/779/original/3d-medicine-pill-and-tablet-icon-png.png"
          className="card-img-top"
          alt="no image"
        />
        <div className="card-body">
          <h5 className="card-title">Name is : {user.name}</h5>
          <p className="card-text">Description : {user.dose}</p>
        </div>
      </div>
    );
  });

  return (
    < div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

        <ResponsiveAppBar />
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%', display: 'flex' }}>

          <div className="image">
            <div>
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>You have {size} medicines</p>
                </blockquote>
              </figure>
            </div>
            <div style={{ display: "inline-flex" }}>{listo}</div>
          </div>
        </div>
        <BottomBar />
      </AppBar >
    </div >);
}

export default PrescriptionsDetails;
