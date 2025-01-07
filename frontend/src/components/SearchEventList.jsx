import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import Grid from '@mui/material/Grid';
const SearchEventList = ({ monthYear }) => {
  const [eventList, setEventList] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events`)
      .then((response) => {
        if (response.data.success) {
          setEventList(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const { selectedMonth, selectedYear } = monthYear;

  // Filter the events based on the selected year and month
  const filteredEvents = eventList.filter((eventDetails) => {
    return (
      eventDetails.date.year === selectedYear &&
      eventDetails.date.month === selectedMonth
    );
  });

  // Function to render event cards
  const renderEventCards = () => {
    return filteredEvents.map((eventDetails) => (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        key={eventDetails.eventId} 
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
      <EventCard
        key={eventDetails._id}
        title={eventDetails.title}
        date={eventDetails.date}
        location={eventDetails.location}
        img={eventDetails.img}
        createdBy={eventDetails.createdBy}
      />
      </Grid>
    ));
  };

  return (
    <>
    <Grid container spacing={2}
      sx={{
        justifyContent:
          filteredEvents.length === 1 || filteredEvents.length === 2
            ? 'center'
            : 'flex-start', // Center items when only 1 or 2 events
      }}>
      {filteredEvents.length > 0 ? (
        
        renderEventCards()
      ) : (
        <p>No events found for {selectedMonth} {selectedYear}.</p>
      )}
      </Grid>
    </>
  );
};

export default SearchEventList;
