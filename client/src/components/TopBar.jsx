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
import WalletIcon from "@mui/icons-material/Wallet";

const pages = ["Home", "Medicine", "My Cart", "My Orders"];

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleDoctorList = () => {
    navigate("/AllDoctors");
  };
  const handleHome = () => {
    navigate("/HomePage");
  };
  const handlePresList = () => {
    navigate("/PrescriptionsList");
  };
  const handleAddFamilyMember = () => {
    navigate("/PatientHP_FM");
  };
  const handlePack = () => {
    navigate("/PatientHP_FM");
  };
  const handleCall = () => {
    navigate("/Call");
  };
  const handleMyApp = () => {
    navigate("/patientFamilyAppointments");
  };
  const handleHealthRecords = () => {
    navigate("/PatientHealthRecords/:patientId");
  };
  const handleMyWallet = () => {
    navigate("/PatientWallet/:patientName");
  };
  const handlePass = () => {
    navigate("/changePassPat");
  };
  const handleCloseNavMenu = () => {
    //   navigate("/cart");
    setAnchorElNav();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.pathname = "/";
  };

  return (
    <AppBar
      style={{
        height: "100px",
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleHome}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "11px",
              }}
            >
              {" "}
              Home{" "}
            </Button>
            <Button
              onClick={handleDoctorList}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "11px",
                marginRight: "0.5%",
                marginLeft: "0.5%",
              }}
            >
              {" "}
              Doctors{" "}
            </Button>
            <Button
              onClick={handlePresList}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "11px",
              }}
            >
              {" "}
              Prescriptions{" "}
            </Button>
            <Button
              onClick={handleAddFamilyMember}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "11px",
              }}
            >
              {" "}
              Family Members{" "}
            </Button>
            <Button
              onClick={handleMyApp}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "11px",
              }}
            >
              {" "}
              My Appointments{" "}
            </Button>

            <Button
              onClick={handleHealthRecords}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "11px",
              }}
            >
              {" "}
              Health Records{" "}
            </Button>
            <Button
              onClick={handlePack}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "11px",
              }}
            >
              {" "}
              Health Packages{" "}
            </Button>
            <Button
              onClick={handlePass}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginRight: "0.5%",
                marginLeft: "0.5%",
                fontSize: "11px",
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
                fontSize: "11px",
              }}
            >
              {" "}
              Call{" "}
            </Button>
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
                onClick={handleLogout}
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
