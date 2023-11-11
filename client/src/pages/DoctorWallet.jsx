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


function DoctorWallet() {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  // Manually set the patient ID
  const doctorName = "youssef";

  useEffect(() => {
    const apiUrl = `http://localhost:8000/doctor/getWallet/${doctorName}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data);
        setWallet(response.data); // Assuming response.data.wallet is a number
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred");
        setLoading(false);
      });
  }, [doctorName]);


  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

        <ResponsiveAppBar />
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%' }}>
          <div className="card-header">
            <h2>My wallet</h2>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p><Alert style={{ marginTop: '5%', fontSize: '18px', backgroundColor: ' RGB(205, 92, 92)' }} variant="filled" severity="error">
                Error: {error}
              </Alert>
              </p>
            ) : (
              <div style={{ fontFamily: 'Roboto', fontSize: '24px', fontWeight: 'bolder' }}>${wallet}</div>
            )}
          </div>
        </div>
        <BottomBar />
      </AppBar >
    </div >
  );
}

export default DoctorWallet;