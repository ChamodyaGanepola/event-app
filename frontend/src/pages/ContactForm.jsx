import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import bg from "/assets/contactUs.jpg";

const ContactForm = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { name, email, phone, message } = data;

    if (!name.trim()) return setErrorMessage("Please enter your name");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setErrorMessage("Please enter a valid email address");
    if (!phone.trim() || !/^\d{10}$/.test(phone)) return setErrorMessage("Please enter a valid 10-digit phone number");
    if (!message.trim()) return setErrorMessage("Please enter your message");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      setData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
        <img src={bg} alt="Contact" width="100%" style={{ maxHeight: 250, objectFit: "cover" }} />
      </Box>

      <Typography variant="h4" gutterBottom align="center" color="primary">
        Contact Form
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Your Name" name="name" value={data.name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" name="email" value={data.email} onChange={handleChange} margin="normal" required type="email" />
          <TextField fullWidth label="Phone Number" name="phone" value={data.phone} onChange={handleChange} margin="normal" required type="tel" />
          <TextField fullWidth label="Your Message" name="message" value={data.message} onChange={handleChange} margin="normal" required multiline rows={4} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>

      {errorMessage && (
        <Box sx={{ mt: 2, textAlign: "center", color: "red", fontWeight: "bold" }}>
          {errorMessage}
        </Box>
      )}

      {isSubmitted && (
        <Box sx={{ mt: 2, textAlign: "center", color: "green", fontWeight: "bold" }}>
          Form submitted successfully!
        </Box>
      )}
    </Container>
  );
};

export default ContactForm;
