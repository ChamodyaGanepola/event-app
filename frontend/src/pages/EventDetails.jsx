import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const EventDetails = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch event: ${response.statusText}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid content type, expected JSON");
        }
        const data = await response.json();
        setEvent(data.data); // Extract `data` key
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegisterClick = async () => {
    // Open the confirmation dialog
    setOpenDialog(true);
  };

  const handleConfirmRegister = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/register/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to register: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        alert("Successfully registered for the event!");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Error registering for event. Please try again later.");
    } finally {
      // Close the dialog after registration attempt
      setOpenDialog(false);
    }
  };

  const handleCancelRegister = () => {
    // Close the dialog without registering
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      style={{
        padding: "0",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Event Details
      </Typography>
      {event ? (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Box sx={{ padding: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                style={{
                  fontFamily: 'BlinkMacSystemFont',
                  fontSize: 40,
                  fontWeight: 40,
                  color: "purple",
                }}
              >
                {event.title}
              </Typography>
              <Box
                component="img"
                src={event.img}
                alt={event.title}
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
              <Typography variant="h6" paragraph>
                <strong>Date:</strong>{" "}
                {`${event.date.year}-${event.date.month}-${event.date.Date}`}
              </Typography>
              <Typography variant="h6" paragraph>
                <strong>Location:</strong> {event.location}
              </Typography>
              <Typography variant="h6" paragraph>
                <strong>Description:</strong> {event.description}
              </Typography>
              <Typography variant="h6">
                <strong>Created by:</strong> {event.createdBy}
              </Typography>

              {/* Display register button */}
              <Box
                display="flex"
                justifyContent="center"
                style={{ marginTop: "20px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" align="center">
          Event not found.
        </Typography>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelRegister}>
        <DialogTitle>Confirm Registration</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to register for this event?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRegister} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRegister} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetails;
