import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
const doctorId="654d8a73bb465e1aaf27c508";
const AvailableAppointments = () => {
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);

  const formatDate = (dateTime) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateStr = new Date(dateTime).toLocaleDateString('en-GB', options);
    const timeStr = new Date(dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${dateStr} ${timeStr}`;
  };
  
  useEffect(() => {
    // Fetch doctor information
    axios.get(`http://localhost:8000/doctor/${doctorId}`)
      .then((response) => {
        setDoctor(response.data);
        setSlots(response.data.availableSlots);
        console.log(slots);
      })
      .catch((error) => {
        console.error('Failed to fetch doctor:', error);
      });
  }, [doctorId]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4">{doctor.name}</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">{doctor.speciality}</Typography>
        </CardContent>
      </Card>
      <List>
        {slots.map((slot) => (
          <ListItem key={slot._id}>
            <ListItemText primary={formatDate(slot)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AvailableAppointments;
