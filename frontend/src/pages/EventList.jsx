import React, { useState, useEffect } from "react";
import { Typography, Button, CircularProgress, Alert, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import EventCard from "../components/EventCard";

export default function EventList() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
  console.log("All ENV Variables:", import.meta.env);

  const [eventList, setEventList] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch events when component mounts
    axios
      .get(`${API_BASE_URL}/events`)
      .then((response) => {
        if (response.data.success) {
          const sortedEvents = response.data.data.sort(
            (a, b) => new Date(a.date) - new Date(b.date) // Sort by date in ascending order
          );
          setEventList(sortedEvents);
          setLoading(false); // Set loading to false after data is fetched
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events. Please try again later."); // Set error message
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Determine the events to display
  const eventsToDisplay = showAll ? eventList : eventList.slice(0, 6);

  // Handle loading state
  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1px",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" sx={{ color: "purple", marginBottom: "16px" }}>
        Upcoming Events
      </Typography>
      
      {/* If data is available, display event cards */}
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px", // Consistent horizontal and vertical gap
        }}
      >
        {eventsToDisplay.map((event) => (
          <Grid item key={event.eventId}>
            <EventCard
              eventId={event.eventId}
              title={event.title}
              date={event.date}
              location={event.location}
              img={event.img}
              createdBy={event.createdBy}
            />
          </Grid>
        ))}
      </Grid>

      {/* Load More button */}
      {!showAll && eventList.length > 6 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "purple",
              color: "white",
              "&:hover": {
                backgroundColor: "darkviolet",
              },
            }}
            onClick={() => setShowAll(true)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
