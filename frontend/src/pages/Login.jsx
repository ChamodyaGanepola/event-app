import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Avatar, Button, TextField, Typography, Link } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

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
        const { token, profileImg } = response.data.data;

        // Store token in localStorage 
        localStorage.setItem("authToken", token);
        localStorage.setItem("profileImg", profileImg);

        // Set authorization token globally using Axios
        setAuthToken(token);
        window.location.href = "/";
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh"}}>
     
      {/* Leftside  */}
      <Grid
        item
        xs={false}
        sm={3} // 1/4 of the screen
        sx={{
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          height: "100vh"
        }}
      >
        <Typography variant="h5">New here?</Typography>
        <Link href="/sign-up" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              marginTop: 2,
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "darkviolet",
                color: "darkviolet",
              }
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Grid>
       {/* RIght side (Login Form) */}
      <Grid
        item
        xs={12}
        sm={9} // 3/4 of the screen
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2
        }}
      >
        <Grid align="center" sx={{ marginBottom: 3 }}>
          <Avatar sx={{ backgroundColor: "purple" }}>
            <LoginIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          {error && (
            <Typography color="error" sx={{ textAlign: "center", marginBottom: 2 }}>
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
              "&:hover": {
                backgroundColor: "darkviolet",
              },
              width: "100%",
            }}
          >
            Sign In
          </Button>

          <Typography sx={{ marginTop: "15px", marginBottom: "15px" }}>
            <Link href="#">Forget password?</Link>
          </Typography>

        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
