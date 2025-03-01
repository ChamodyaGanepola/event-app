import React, { useState } from "react";
import { Avatar, Button, TextField, Typography, Grid } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // Extract token from URL params
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/users/reset-password`, {
        password,
        token,
      });
      console.log("token",token);
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
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
          Reset Password
        </Typography>
        <form onSubmit={handleResetPassword} style={{ width: "100%", marginTop: 2 }}>
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
            label="New Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Reset Password
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
