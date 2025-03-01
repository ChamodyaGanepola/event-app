import React, { useState, useEffect } from "react";
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
  DialogTitle,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("authToken");
  const profileImg = localStorage.getItem("profileImg");
  const username = localStorage.getItem("username");
  const type = localStorage.getItem("type");

  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // To track screen size

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => setLogoutDialogOpen(true);
  const handleLogoutConfirm = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("profileImg");
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    window.location.href = "/";
  };
  const handleLogoutCancel = () => setLogoutDialogOpen(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Handle window resize event to check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960); //  can be adjusted based on  desired breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize); // Listen for resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  // Close drawer automatically on large screens
  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "purple", height: "100px" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          px: 2,
        }}
      >
        {/* Logo and Title */}
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src="/assets/GatherHub.png"
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            GatherHub
          </Typography>
        </Box>

        {/* Hamburger Menu for small screen */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{ "& .MuiDrawer-paper": { backgroundColor: "#CBC3E3" } }}
          >
            <List>
              {isAuthenticated ? (
                <>
                  <ListItem disablePadding>
                    <ListItem>
                      <Avatar
                        sx={{
                          bgcolor: "white",
                          color: "purple",
                          cursor: "pointer",
                          marginRight: 1,
                        }}
                        src={profileImg}
                        onClick={handleMenuOpen}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "purple", fontWeight: "bold" }}
                      >
                        {username}
                      </Typography>
                    </ListItem>
                  </ListItem>
                </>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/login">
                    <ListItemText
                      primary="Login"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        padding: 1,
                        borderRadius: 1,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/find-events">
                  <ListItemText primary="Find Event" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/contact">
                  <ListItemText primary="Contact" />
                </ListItemButton>
              </ListItem>
              {type === "Admin" && (
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/create-event">
                    <ListItemText primary="Create Event" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Drawer>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/find-events" color="inherit">
            Find Event
          </Button>
          <Button component={Link} to="/contact-us" color="inherit">
            Contact
          </Button>
          {/* Show "Create Event" only if user is admin */}
          {type === "Admin" && (
            <Button component={Link} to="/create-event" color="inherit">
              Create Event
            </Button>
          )}
          {isAuthenticated ? (
            <>
              <Avatar
                sx={{ bgcolor: "white", color: "purple", cursor: "pointer" }}
                src={profileImg}
                onClick={handleMenuOpen}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
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
        <DialogContent>Are you sure you want to logout?</DialogContent>
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
