import { useEffect, useState } from "react";
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

function MyPatientsList() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/doctor/viewPatients/6526653e47c45e179aa6886b")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  function handleFilter() {
    // Navigate to another route and pass the ID as a prop
    navigate(`/viewUpcomingApp`);
  }

  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/viewHealth/${id}`);
  }

  function handleAddHealthRecord(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/AddHealthRecords/${id}`);
  }

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
          style={{ width: "80%", borderRadius: "20px", left: "8%" }}
        >
          <div className="card-header">
            <h2>Your patients' list</h2>
            <button className="btn btn-success" onClick={() => handleFilter()}>
              filter to future appointments
            </button>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                      <input
                        type="text"
                        placeholder="search with a name"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td></td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleView(item._id)}
                          >
                            view
                          </button>
                        </td>
                        <td></td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleAddHealthRecord(item._id)}
                          >
                            add health record
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default MyPatientsList;
