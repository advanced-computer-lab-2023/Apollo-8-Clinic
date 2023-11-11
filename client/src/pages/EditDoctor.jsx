import { useRef } from "react";
import Sidebar from "../components/SidebarDoctor";
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



function EditDoctor() {
  const email = useRef(null);
  const rate = useRef(null);
  const hospital = useRef(null);

  function onClick(e) {
    // func(email.current.value,rate.current.value,hospital.current.value,ID.current.value)
    e.preventDefault();
    axios
      .post("http://localhost:8000/doctor/UpdateDoctor", {
        email: email.current.value,
        hourlyRate: rate.current.value,
        hospital: hospital.current.value,
        doctorID: "6526653e47c45e179aa6886b",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

        <ResponsiveAppBar />
        <div className="card m-3 col-12" style={{ width: "80%", borderRadius: '20px', left: '8%' }}>
          <h1 className="display-6">Update My Profile</h1>
          <div
            style={{
              width: "50%",
              margin: "auto",
              marginTop: 100,
              padding: "10px",
              border: "5px solid ",
              borderColor: "black",
            }}
          >
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                ref={email}
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Hourly rate</label>
              <input
                ref={rate}
                type="number"
                className="form-control"
                placeholder="Number Of Hours You Work"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Hospital</label>
              <input
                ref={hospital}
                type="text"
                className="form-control"
                placeholder="Put A Correct Hospital Name"
              />
            </div>

            <button type="button" onClick={onClick} className="btn btn-primary">
              Submit
            </button>

            <figcaption style={{ margin: 20 }} className="blockquote-footer">
              note: if somthing you do not want update keep it empty
            </figcaption>
          </div>
        </div>
        <BottomBar />

      </AppBar >

    </div >
  );
}

export default EditDoctor;
