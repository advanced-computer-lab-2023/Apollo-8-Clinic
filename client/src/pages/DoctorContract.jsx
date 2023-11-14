import { useRef } from "react";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import "../App.css";

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

import ResponsiveAppBar from "./TopBarDoc";
import Ads from "./Ads";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BottomBar from "./BottomBar";

function DoctorContract() {
  {
    const [data, setData] = useState();
    const change2 = useRef(null);

    useEffect(() => {
      const apiUrl = "http://localhost:8000/doctor/contract";
      axios
        .get(apiUrl)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .put(" http://localhost:8000/doctor/acceptContract", {})
        .then((result) => {
          if (result.status === 200) {
            change2.current.style.display = "block";
          }
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
            style={{
              borderRadius: "50px",
              margin: "10px",
              width: "40%",
              marginLeft: "30%",
            }}
          >
            <div
              style={{
                backgroundColor: " rgb(65, 105, 225)",
                borderRadius: "50px",
                margin: "10px",
                width: "80%",
                marginLeft: "10%",
                height: "60px",
              }}
            >
              <h1
                style={{
                  font: "Arial",
                  fontWeight: "bold",
                  color: "white",
                  margin: "10px",
                }}
              >
                Contract
              </h1>
            </div>
            <div
              className="card m-3 col-12"
              style={{ width: "80%", left: "8%" }}
            >
              <div ref={change2} style={{ display: "none" }}>
                <div
                  style={{ height: "50px" }}
                  class="alert alert-primary d-flex align-items-center"
                  role="alert"
                >
                  <svg
                    class="bi flex-shrink-0 me-2"
                    role="img"
                    aria-label="Info:"
                  >
                    <use xlink:href="#info-fill" />
                  </svg>
                  <div>contract successfully accepted!</div>
                </div>
              </div>
              <form>
                <div>
                  {data && (
                    <div>
                      <p>Your hourly rate is: {data.hourlyRate} </p>
                      <p>
                        After adding the clinic 10% markup the session price
                        will be: {data.hourlyRate * 1.1}
                      </p>
                    </div>
                  )}
                </div>
                {data && data.status == "PendingContract" && (
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    class="btn btn-primary"
                  >
                    Accept
                  </button>
                )}
              </form>
            </div>
          </div>

          <BottomBar />
        </AppBar>
      </div>
    );
  }
}

export default DoctorContract;
