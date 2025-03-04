import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const CreateEvent = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    title: "",
    date: { year: "", month: "", Date: "" },
    location: "",
    description: "",
    img: "", // Base64 string
    createdBy: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["year", "month", "Date"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        date: { ...prev.date, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set max size to 2MB (2 * 1024 * 1024 bytes)
      const maxSize = 2 * 1024 * 1024;
  
      if (file.size > maxSize) {
        console.error("File size exceeds 2MB. Please upload a smaller image.");
        alert("File size exceeds 2MB. Please upload a smaller image.");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, img: reader.result })); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      date: {
        year: parseInt(formData.date.year, 10),
        month: formData.date.month,
        Date: parseInt(formData.date.Date, 10),
      },
      location: formData.location,
      description: formData.description,
      img: formData.img,
      createdBy: formData.createdBy,
    };

    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post(`${API_BASE_URL}/events/save`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
      });
      console.log(response);
      
      setFormData({
        title: "",
        date: { year: "", month: "", Date: "" },
        location: "",
        description: "",
        img: "",
        createdBy: "",
      });
      setMessage("Event created successfully!");
      setTimeout(() => {
        setMessage("");
      }, 60000);

    } catch (error) {
      setMessage("Failed to create event.");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Paper elevation={10} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" component="h1" align="center" mb={3}>
          Create Event
        </Typography>

        {message && (
          <Alert severity={message.includes("successfully") ? "success" : "error"} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Typography variant="subtitle1" mt={2}>
            Date:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Year"
                type="number"
                name="year"
                value={formData.date.year}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Month"
                name="month"
                value={formData.date.month}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Day"
                type="number"
                name="Date"
                value={formData.date.Date}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            margin="normal"
          />

          <Typography variant="subtitle1" mt={2}>
            Image:
          </Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ textAlign: "left", mt: 1 }}
          >
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleFileChange} required />
          </Button>

          <TextField
            fullWidth
            label="Created By"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, padding: "10px 0" }}
          >
            Create Event
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CreateEvent;
