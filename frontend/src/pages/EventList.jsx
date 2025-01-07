import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import EventCard from "../components/EventCard";

export default function EventList() {
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
  console.log("All ENV Variables:", import.meta.env);
  
  const [eventList, setEventList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events`)
      .then((response) => {
        if (response.data.success) {
          const sortedEvents = response.data.data.sort(
            (a, b) => new Date(a.date) - new Date(b.date) // Sort by date in ascending order
          );
          setEventList(sortedEvents);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Determine the events to display
  const eventsToDisplay = showAll ? eventList : eventList.slice(0, 6);

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" sx={{ color: "purple", marginBottom: "16px" }}>
        Upcoming Events
      </Typography>
      {eventList.length > 0 ? (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              "@media (max-width:600px)": {
                flexDirection: "column",
              },
            }}
          >
            {eventsToDisplay.map((event) => (
              <Grid
                item
                key={event.eventId}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
        </>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No events available
        </Typography>
      )}
    </div>
  );
}
