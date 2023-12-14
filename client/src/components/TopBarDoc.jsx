import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';
import WalletIcon from "@mui/icons-material/Wallet";
import axios from "axios";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";

const pages = ["Home", "Medicine", "My Cart", "My Orders"];

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [unseenNotifications, setunseenNotifications] = useState();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [notfications, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/doctor/getNotfication")
      .then((response) => {
        
        var num=0;
        for (let i = 0; i < response.data.length; i++) {
          if(response.data[i].state==="Unread"){
            num++;
          }
        }
        setunseenNotifications(num);
        setData(response.data);
        setDataFetched(true);
      })
      .catch((error) => {
        console.log(error);
        setDataFetched(true);
      });
  }, []);

  const handleOpenPopover = (event) => {
    
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    axios
      .get("http://localhost:8000/doctor/sawNotfication")
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("out")
    setPopoverAnchorEl(null);
  };

  const openPopover = Boolean(popoverAnchorEl);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleApp = () => {
    navigate("/doctorAppointments");
  };
  const handleHome = () => {
    navigate("/HomePageDoc");
  };
  const handlePatientsList = () => {
    navigate("/viewMyPatients");
  };
  const handleUpcoming = () => {
    navigate("/viewUpcomingApp");
  };
  const handleHealthRecords = () => {
    navigate("/AddHealthRecords");
  };
  const handleTimeSlots = () => {
    navigate("/AddTimeSlots");
  };
  const handleCall = () => {
    navigate("/Call");
  };
  const handleMyWallet = () => {
    navigate("/DoctorWallet/:doctorName");
  };

  const handleEditDoc = () => {
    navigate("/editDoctor");
  };

  const handleFollowUp = () => {
    navigate("/FollowUP/:doctorName");
  };
  const handleContract = () => {
    navigate("/contract");
  };
  const handlePass = () => {
    navigate("/changePassDoc");
  };
  const handleCloseNavMenu = () => {
    //   navigate("/cart");
    setAnchorElNav();
  };

  const handlePending = () => {
    navigate("/FollowUPPending/:doctorName");
  };

  const handleChatNavigate = () => {
    navigate("/ChatDoctor");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.pathname = "/";
  };

  return (
    <AppBar
      style={{
        height: "90px",
        backgroundColor: " rgb(65, 105, 225)",
      }}
      position="static"
    >
      <Container style={{ marginTop: "10px" }} maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Elha2ony Clinic
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            style={{}}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Button
              onClick={handleHome}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Home{" "}
            </Button>
            <Button
              onClick={handleApp}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Appointments{" "}
            </Button>
            <Button
              onClick={handlePatientsList}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              My Patients{" "}
            </Button>
            <Button
              onClick={handleUpcoming}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Upcomming Appointments{" "}
            </Button>
            <Button
              onClick={handleHealthRecords}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Add Health Record{" "}
            </Button>
            <Button
              onClick={handleTimeSlots}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Add Time-Slots{" "}
            </Button>
            <Button
              onClick={handlePending}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Pending Follow Up{" "}
            </Button>
            <Button
              onClick={handleFollowUp}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Follow Up{" "}
            </Button>
            <Button
              onClick={handleEditDoc}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Update Profile{" "}
            </Button>
            <Button
              onClick={handleContract}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Contract{" "}
            </Button>
            <Button
              onClick={handlePass}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Change Password{" "}
            </Button>
            <Button
              onClick={handleCall}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "9px",
              }}
            >
              {" "}
              Call{" "}
            </Button>
          </Box>
          <Badge style={{marginRight:"40px", transform: 'none'}} overlap="circular" badgeContent={unseenNotifications} color="secondary">
          <IconButton style={{color:"yellow"}}  aria-label="notifications" onClick={handleOpenPopover}>
            <NotificationsIcon style={{ fontSize: '2rem' }}/>
          </IconButton>
        </Badge>

         {/* Popover with Notification Data */}
         <Popover
            open={openPopover}
            anchorEl={popoverAnchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div>
            {dataFetched ? (
             <div>
      {notfications.map((notifi, index) => (
          <Card sx={{ display: "flex", maxWidth: 500,backgroundColor:"skyblue",border:"solid",borderBlockWidth:"1px" }}>
    {/* Smaller image and align to the left */}
    <CardMedia
      component="img"
      alt="Notification Image"
      height="70"
      image="https://img.freepik.com/free-vector/appointment-booking-with-calendar_52683-39831.jpg"
      sx={{ alignSelf: "center", marginLeft: 1 }}
    />
    <CardContent>
      <div>
        {/* Title */}
        <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
          {notifi.title}
        </Typography>
        {/* Text */}
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {notifi.data}
        </Typography>
        {/* Boolean value (example: true) */}
          <Typography variant="body2" style={{color:"black"}} color="text.secondary">
            {notifi.state}
          </Typography>
        </div>
      </CardContent>
    </Card>
    ))}
   </div>
   ) : (
    <p>Loading...</p>
  )}
  </div>
          </Popover>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title=" Chat">
              <IconButton
                style={{ paddingLeft: "20px" }}
                onClick={handleChatNavigate}
                sx={{ p: 0 }}
              >
                <ChatIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="My Wallet">
              <IconButton style={{}} onClick={handleMyWallet} sx={{ p: 0 }}>
                <WalletIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                style={{ paddingLeft: "20px" }}
                onClick={handleSubmit}
                sx={{ p: 0 }}
              >
                <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
