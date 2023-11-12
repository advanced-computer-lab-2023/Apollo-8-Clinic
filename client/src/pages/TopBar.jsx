import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';

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
import imgSrc from "../images/photo.png"
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
import ViewDoctor from './ViewDoctor';
import WalletIcon from '@mui/icons-material/Wallet';
import PatientWallet from './PatientWallet';

const pages = ['Home', 'Medicine', 'My Cart', 'My Orders'];

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
        navigate("/patientFamilyAppointments");
    };
    const handlePack = () => {
        navigate("/PatientHP_FM");
    };
    const handleMyApp = () => {
        navigate("/PatientAppointments");
    };
    const handleHealthRecords = () => {
        navigate("/viewHealth/:patientID");
    };
    const handleMyWallet = () => {
        navigate("/PatientWallet/:patientName");
    };
    const handleCloseNavMenu = () => {
        //   navigate("/cart");
        setAnchorElNav();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar style={{
            height: "100px", backgroundColor: " rgb(65, 105, 225)"
        }} position="static" >
            <Container style={{ marginTop: "10px" }
            } maxWidth="xl" >
                <Toolbar disableGutters>

                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Elha2ony Clinic
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button onClick={handleHome} sx={{ my: 2, color: 'white', display: 'block', marginRight: '0.5%', marginLeft: '0.5%' }}> Home     </Button>
                        <Button onClick={handleDoctorList} sx={{ my: 2, color: 'white', display: 'block', marginRight: '0.5%', marginLeft: '0.5%' }}> Doctors     </Button>
                        <Button onClick={handlePresList} sx={{ my: 2, color: 'white', display: 'block', marginRight: '0.5%', marginLeft: '0.5%' }}> Prescriptions     </Button>
                        <Button onClick={handleAddFamilyMember} sx={{ my: 2, color: 'white', display: 'block', marginRight: '0.5%', marginLeft: '0.5%' }}> Add Family Member     </Button>
                        <Button onClick={handleMyApp} sx={{ my: 2, color: 'white', display: 'block', marginRight: '0.5%', marginLeft: '0.5%' }}> My Appointments     </Button>

                        <Button onClick={handleHealthRecords} sx={{ my: 2, color: 'white', display: 'block', marginRight: '0.5%', marginLeft: '0.5%' }}> Health Records     </Button>
                        <Button onClick={handlePack} sx={{ my: 2, color: 'white', display: 'block', marginRight: '0.5%', marginLeft: '0.5%' }}> Health Packages     </Button>

                    </Box>


                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="My Wallet">
                            <IconButton style={{}} onClick={handleMyWallet} sx={{ p: 0, }}>

                                <WalletIcon fontSize='large' sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open Your Profile">
                            <IconButton style={{ paddingLeft: "20px" }} onClick={"/cart"} sx={{ p: 0 }}>

                                <AccountCircleIcon fontSize='large' sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>

                    </Box>
                </Toolbar>
            </Container>


        </AppBar >
    )
}
export default ResponsiveAppBar;