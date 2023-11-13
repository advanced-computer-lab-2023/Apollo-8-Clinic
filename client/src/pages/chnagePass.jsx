import { useRef } from "react";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
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

import ResponsiveAppBar from './TopBar';
import Ads from './Ads';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BottomBar from './BottomBar';


function ChangePass() {
  {
    const [password, setPass] = useState();
    const [password1, setPass1] = useState();
    const change = useRef(null);
    const change2 = useRef(null);



    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(password + " " + password1)
      if (password !== password1 || password === password.toLowerCase() || password.length < 8) {
        change.current.style.display = 'block';
        change2.current.style.display = 'none';
      }
      else {
        change.current.style.display = 'none';

        //  console.log(email);
        const token = JSON.parse(sessionStorage.getItem('token'));
        console.log(token);
        axios
          .post(" http://localhost:8000/admin/chanePass", {
            "password": password
          }, {
            headers: {
              Authorization: `Barer ${token}`
            }
          })
          .then((result) => {
            if (result.status === 200) {
              change2.current.style.display = "block";
            }
          })
          .catch((err) => console.log(err));
      }
    };

    return (
      <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
        <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto" }}>

          <ResponsiveAppBar />
          <div style={{ borderRadius: '50px', margin: '10px', width: '40%', marginLeft: '30%' }}>

            <div style={{ backgroundColor: " rgb(65, 105, 225)", borderRadius: '50px', margin: '10px', width: '80%', marginLeft: '10%', height: '60px' }}>
              <h1 style={{ font: "Arial", fontWeight: 'bold', color: "white", margin: "10px" }}>
                Change My Password</h1>

            </div>
            <div className="card m-3 col-12" style={{ width: "80%", left: "8%" }}>

              <div ref={change2} style={{ display: 'none' }}>
                <div style={{ height: '50px' }} class="alert alert-primary d-flex align-items-center" role="alert">
                  <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:"><use xlink: href="#info-fill" /></svg>
                  <div>
                    New Password is successfully saved!
                  </div>
                </div>
              </div>

              <div ref={change} style={{ display: 'none' }}>
                <div style={{ height: '50px' }} class="alert alert-danger d-flex align-items-center" role="alert">
                  <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink: href="#exclamation-triangle-fill" /></svg>
                  <div>
                    Password not match or incorrect format
                  </div>
                </div>
              </div>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Password</label>
                  <input onChange={(e) => setPass(e.target.value)} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                  <input onChange={(e) => setPass1(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
                  <div class="form-text">Must be as the upper password.</div>
                </div>
                <button onClick={handleSubmit} type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div >
          </div >

          <BottomBar />

        </AppBar >

      </div >
    );
  }


}

export default ChangePass;