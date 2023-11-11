import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/SidebarPatient";
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
import Pagination from '@mui/material/Pagination';
import { Alert } from "@mui/material";

import ResponsiveAppBar from './TopBar';
import Ads from './Ads';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BottomBar from "./BottomBar";


function Health() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthDate, setDate] = useState(null);
  const [phone, setPhone] = useState(null);
  const [records, setHealth] = useState([]);
  const { patientID } = useParams();
  const doctorID = "6526653e47c45e179aa6886b";
  //const patientID = "6523ba9cd72b2eb0e39cb137";

  useEffect(() => {
    const apiUrl = "http://localhost:8000/doctor/getHealthRecord";
    axios
      .post(apiUrl, {
        doctorID,
        patientID,
      })
      .then((response) => {
        if (response.data) {
          setData(response.data);
          setName(response.data[0].patientId.name);
          setEmail(response.data[0].patientId.email);
          setGender(response.data[0].patientId.gender);
          setDate(response.data[0].patientId.birthDate);
          setPhone(response.data[0].patientId.phone);
          setHealth(response.data[0].patientId.health_records.records);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const listo = data.map((user, i) => {
    console.log(user);
    return (
      <div

        key={i}
        className="card"
        style={{
          width: 300,
          margin: 50,
          border: "5px solid ",
          borderColor: "black",
        }}
      >
        <img
          style={{ height: 200, width: 200 }}
          src="https://www.managemore.com/images/appointment.jpg"
          className="card-img-top"
          alt="no image"
        />
        <div className="card-body">
          <h5 className="card-title">Appointment : {i + 1}</h5>
          <p className="card-text">status : {user.status}</p>
          <p className="card-text">date : {user.date}</p>
        </div>
      </div>
    );
  });

  const list = records.map((user, i) => {
    console.log(user);
    return (
      <div
        key={i}
        className="card"
        style={{
          width: 300,
          margin: 50,
          border: "5px solid ",
          borderColor: "black",
        }}
      >
        <img
          style={{ height: 200, width: 200 }}
          src="https://img.freepik.com/free-vector/human-bones-realistic-x-ray-shots_1284-29690.jpg"
          className="card-img-top"
          alt="no image"
        />
        <div className="card-body">
          <h5 className="card-title">Record : {i + 1}</h5>
          <p className="card-text">decription : {user.decription}</p>
          <p className="card-text">date : {user.date}</p>
        </div>
      </div>
    );
  });

  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto", }}>
        <ResponsiveAppBar />
        <div className="card m-3 col-12" style={{ width: "80%", left: '8%' }}>
          {/*fofaaaaaa
      
      */}

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Birth-Date</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{name}</th>
                <td>{email}</td>
                <td>{gender}</td>
                <td>{birthDate}</td>
                <td>{phone}</td>
              </tr>
            </tbody>
          </table>

          {/*fofaaaaaa
      
      */}
          <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
            {listo}
            {list}
          </div>
        </div>
        <BottomBar />
      </AppBar >
    </div >
  );
}

export default Health;
