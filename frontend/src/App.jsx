import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <div>
      <Navbar />
      <Box sx={{ backgroundColor: '#CBC3E3', minHeight: '100vh' }}>
        <CssBaseline />
        <Outlet />
      </Box>
    </div>
  );
}

export default App;



