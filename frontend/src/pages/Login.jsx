import React, { useState } from "react";
import { Grid, Avatar, Button, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });
      if (response.data.success) {
        const { token, profileImg, username, type, userId } = response.data.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("profileImg", profileImg);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);
        localStorage.setItem("type", type);

        setAuthToken(token);
        window.location.href = "/";
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", display: "flex", flexDirection: "row" }}
    >
      {/* Left Section: Login Form */}
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Grid align="center" sx={{ marginBottom: 3 }}>
          <Avatar sx={{ backgroundColor: "purple" }}>
            <LoginIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {error && (
            <Typography
              color="error"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginTop: "15px", marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />
          <FormControlLabel
            control={<Checkbox name="checked" />}
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "purple",
              color: "white",
              "&:hover": { backgroundColor: "darkviolet" },
              width: "100%",
            }}
          >
            Sign In
          </Button>
          <Typography sx={{ marginTop: "15px", marginBottom: "15px" }}>
            <Link href="/forgot-password" underline="hover">
              Forgot your password?
            </Link>
          </Typography>
        </form>
      </Grid>

      {/* Right Section: Sign-Up Form */}
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        sx={{
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h5">New here?</Typography>
        <Link href="/sign-up" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            size="medium"
            sx={{
              marginTop: 2,
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "darkviolet",
                color: "darkviolet",
              },
              width: "100%",
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;
