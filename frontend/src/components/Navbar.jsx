import React from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import Logout from "./Logout";

const Navbar = () => {
  // Check if the user is logged in by checking for the token in localStorage
  const isAuthenticated = localStorage.getItem("authToken");
  const profileImg = localStorage.getItem("profileImg");
  console.log("token", isAuthenticated);
  console.log("profile img", profileImg);

  // State for menu anchor
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Remove token and profile image from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("profileImg");
    window.location.href = "/";
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false); 
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "purple",
        height: "100px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          px: 4,
        }}
      >
        {/* Logo and Title */}
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src="/assets/GatherHub.png" 
            alt="Logo"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%", 
              objectFit: "cover",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            GatherHub
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box display="flex" gap={2}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              textShadow: "1px 1px rgba(0, 0, 0, 0.3)",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/find-events"
            color="inherit"
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              textShadow: "1px 1px rgba(0, 0, 0, 0.3)",
            }}
          >
            Find Event
          </Button>
          <Button
            component={Link}
            to="/contact"
            color="inherit"
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              textShadow: "1px 1px rgba(0, 0, 0, 0.3)",
            }}
          >
            Contact
          </Button>
          <Button
            component={Link}
            to="/create-event"
            color="inherit"
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              textShadow: "1px 1px rgba(0, 0, 0, 0.3)",
            }}
          >
            Create Event
          </Button>
          {/* Conditionally render Avatar or Login Button based on authentication */}
          {isAuthenticated ? (
             <>
             <Avatar
               sx={{ bgcolor: "white", color: "purple", cursor: "pointer" }}
               src={profileImg}
               onClick={handleMenuOpen}
             />
             <Menu
               anchorEl={anchorEl}
               open={open}
               onClose={handleMenuClose}
               anchorOrigin={{
                 vertical: "bottom",
                 horizontal: "right",
               }}
               transformOrigin={{
                 vertical: "top",
                 horizontal: "right",
               }}
             >
               <MenuItem onClick={handleMenuClose}>
                 <EditProfile />
               </MenuItem>
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
             </Menu>
           </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
       {/* Logout Confirmation Dialog */}
       <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button
            onClick={handleLogoutConfirm}
            sx={{ color: "red", fontWeight: "bold" }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
