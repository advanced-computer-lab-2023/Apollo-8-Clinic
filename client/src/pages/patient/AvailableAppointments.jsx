import { useState, useEffect } from "react";
import * as React from 'react';

import axios from "axios";
import ResponsiveAppBar from "../../components/TopBar";
import { AppBar } from "@mui/material";
import BottomBar from "../../components/BottomBar";
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
//const id = "654d8a73bb465e1aaf27c508";
const patientID = "6523ba9cd72b2eb0e39cb137";
const AvailableAppointments = () => {
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { id } = useParams();

  const formatDate = (dateTime) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateTime).toLocaleDateString("en-GB", options);
  };
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [value, setValue] = React.useState('New Appointment');


  useEffect(() => {
    console.log(`http://localhost:8000/doctor/${id}`);
    // Fetch doctor information
    axios
      .get(`http://localhost:8000/doctor/${id}`)
      .then((response) => {
        setDoctor(response.data);
        setSlots(response.data.availableSlots);
        console.log(response.data);
        console.log(doctor);
      })
      .catch((error) => {
        console.error("Failed to fetch doctor:", error);
      });
    axios
      .get("http://localhost:8000/patient/NotlinkedFamily/" + patientID)
      .then((res) => {
        setOptions(res.data);
        console.log(res.data);
        console.log(options);
      })
      .catch((error) => {
        console.error("Failed to family members", error);
      });
  }, [id, patientID]);

  // Organize slots by date
  const slotsByDate = {};
  slots.forEach((slot) => {
    const date = formatDate(slot);
    if (!slotsByDate[date]) {
      slotsByDate[date] = [];
    }
    slotsByDate[date].push(slot);
  });

  // Function to handle slot reservation
  const reserveSlot = (slot) => {
    setSelectedSlot(slot);
    setDialogOpen(true);
  };

  // Function to handle option selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle reservation confirmation
  const confirmReservation = async () => {

    if (value == "follow up") {
      try {
        if (!id) {
          console.error("Doctor or its ID is undefined.");
          return;
        }

        const response = await axios.post(
          "http://localhost:8000/patient/followUpRequest",
          {
            doctorId: id,
            familyMemberId: patientID
          }
        );

        if (response.data) {
        }
      } catch (error) {
        console.error("Error Updating Appointment Type ", error);
      }

    }
    else {
      // Implement your reservation logic here
      const reqBody = {
        doctorId: id,
        patientId: patientID,
        date: selectedSlot,
        status: "upcoming",
        type: "regular",
      };
      const newApp = await axios.post(
        "http://localhost:8000/appointment/",
        reqBody
      );
      console.log(selectedSlot);
      console.log(
        `Slot reserved: ${formatTime(selectedSlot)} - Option: ${selectedOption}`
      );
    }
    setDialogOpen(false);
    setSelectedSlot(null);
    setSelectedOption("");

  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSlot(null);
    setSelectedOption("");
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
        <div className="card m-3 col-12" style={{ width: "80%", left: "8%" }}>
          {" "}
          <Typography variant="h4">{doctor?.name}</Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">{doctor?.speciality}</Typography>
            </CardContent>
          </Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Available Slots</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(slotsByDate).map((date) => (
                  <TableRow key={date}>
                    <TableCell style={{ fontSize: "18px" }}>{date}</TableCell>
                    <TableCell>
                      <List>
                        {slotsByDate[date].map((slot) => (
                          <ListItem key={slot._id}>
                            <ListItemText primary={formatTime(slot)} />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => reserveSlot(slot)}
                            >
                              Reserve
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Reservation Dialog */}
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Reserve for..</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel id="option-label">Choose</InputLabel>
                <Select
                  labelId="option-label"
                  id="option-select"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <MenuItem value="Option 1">Me</MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option._id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <FormControl style={{ marginLeft: '10%' }}>
              <FormLabel id="demo-controlled-radio-buttons-group">Type of Appointment</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="regular" control={<Radio />} label="New Appointment" />
                <FormControlLabel value="follow up" control={<Radio />} label="Follow Up" />
              </RadioGroup>
            </FormControl>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmReservation} color="primary">
                Confirm Reservation
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
};

export default AvailableAppointments;
