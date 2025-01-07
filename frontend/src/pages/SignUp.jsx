import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

const SignUp = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "female",
    password: "",
    confirmPassword: "",
    img: "",
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);  // Check if the file is being selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, img: reader.result }));
        console.log("Profile Image (Base64):", reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };
  
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
  }
  
    const payload = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      password: formData.password,
      profileImg: formData.img, // Send Base64 encoded image
    };
    console.log("Payload:", payload); 
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/users/sign-up`,
        payload
      ); 
      alert("Sign up successful!");
      console.log("Response:", response.data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign up error:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid>
      <Paper
        elevation={20}
        style={{ padding: "30px 20px", width: "300px", margin: "20px auto" }}
      >
        <Grid align="center">
          <Avatar style={{ backgroundColor: "purple" }}>
            <PersonAddAltOutlinedIcon />
          </Avatar>
          <h2 style={{ margin: "0" }}>Sign Up</h2>
          <Typography>Please fill this form to create an account</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={handleInputChange}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Enter your email address"
            required
            value={formData.email}
            onChange={handleInputChange}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            required
            value={formData.phoneNumber}
            onChange={handleInputChange}
            sx={{ marginBottom: "15px" }}
          />

          <FormControl sx={{ marginTop: "10px" }}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="gender"
              defaultValue="female"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              style={{ display: "initial" }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            sx={{ marginBottom: "15px" }}
          />

          <label style={{ display: "block", marginTop: "10px" }}>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            style={{ marginBottom: "15px" }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
              />
            }
            label="I accept terms and conditions"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "purple",
              color: "white",
              "&:hover": {
                backgroundColor: "darkviolet",
              },
              width: "100%",
            }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
