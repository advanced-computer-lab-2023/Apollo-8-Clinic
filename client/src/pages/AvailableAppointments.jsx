import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
const doctorId = "654d8a73bb465e1aaf27c508";
const patientID= "651fd358364267c68b56ba41";
const AvailableAppointments = () => {
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const formatDate = (dateTime) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateTime).toLocaleDateString('en-GB', options);
  };
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  useEffect(() => {
    // Fetch doctor information
    axios.get(`http://localhost:8000/doctor/${doctorId}`)
      .then((response) => {
        setDoctor(response.data);
        setSlots(response.data.availableSlots); 
        console.log(response.data);
        console.log(doctor);
      })
      .catch((error) => {
        console.error('Failed to fetch doctor:', error);
      });
      axios.get('http://localhost:8000/patient/NotlinkedFamily/'+patientID)
      .then((res) => {
        setOptions(res.data);
        console.log(res.data);
        console.log(options);
      })
      .catch((error) => {
        console.error('Failed to family members', error);
      });
  }, [doctorId,patientID]);

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
    // Implement your reservation logic here
    const reqBody = {
      doctorId: doctorId,
      patientId: patientID,
      date: selectedSlot,
      status: "upcoming"
    };
    const newApp = await axios.post('http://localhost:8000/appointment/', reqBody);
    console.log(selectedSlot);
    console.log(`Slot reserved: ${formatTime(selectedSlot)} - Option: ${selectedOption}`);
    setDialogOpen(false);
    setSelectedSlot(null);
    setSelectedOption('');
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSlot(null);
    setSelectedOption('');
  };

  return (
    <div>
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
                <TableCell style={{ fontSize: '18px' }}>{date}</TableCell>
                <TableCell>
                  <List>
                    {slotsByDate[date].map((slot) => (
                      <ListItem key={slot._id}>
                        <ListItemText primary={formatTime(slot)} />
                        <Button variant="contained" color="primary" onClick={() => reserveSlot(slot)}>
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
  );
};

export default AvailableAppointments;
