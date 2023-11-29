import { useState } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
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

import ResponsiveAppBar from "../components/TopBarHome";
import Ads from "./Ads";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BottomBar from "../components/BottomBar";

function Doctorlogin() {
  {
    const [name, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
      e.preventDefault();

      //  console.log(email);
      axios
        .post(" http://localhost:8000/doctor/doctorLogin", {
          name,
          password,
        })
        .then((result) => {
          console.log(result.data.token);
          sessionStorage.setItem("token", JSON.stringify(result.data.token));

          window.location.pathname = "/HomePageDoc";
        })
        .catch((err) => console.log(err));
    };

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
            <h2>Doctor Login</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  autoComplete="off"
                  name="username"
                  className="form-control rounded-0"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="form-control rounded-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a href="/ForgetPassword">ForgetPassword</a>
              <button
                style={{ marginTop: "10px" }}
                type="submit"
                className="btn btn-success w-100 rounded-0"
              >
                Login
              </button>
            </form>
          </div>
          <BottomBar />
        </AppBar>
      </div>
    );
  }
}

export default Doctorlogin;
