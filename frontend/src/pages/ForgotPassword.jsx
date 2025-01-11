import React, { useState } from "react";
import { Avatar, Button, TextField, Typography, Grid } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/users/forgot-password`, {
        email,
      });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Avatar sx={{ backgroundColor: "purple" }}>
          <MailOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
          Forgot Password
        </Typography>
        <form onSubmit={handleForgotPassword} style={{ width: "100%", marginTop: 2 }}>
          {message && (
            <Typography color="primary" sx={{ marginBottom: 2 }}>
              {message}
            </Typography>
          )}
          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "purple",
              "&:hover": { backgroundColor: "darkviolet" },
            }}
          >
            Send Reset Link
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
