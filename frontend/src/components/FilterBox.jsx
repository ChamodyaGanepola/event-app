import React, { useState, useEffect } from 'react';
import { dataRender, months, years } from '../utils/DataRender';
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Grid, Container, Paper } from '@mui/material';

export default function FilterBox({ getMonthYear }) {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2024);


  const monthToRender = () => {
    return dataRender(months); // Returns MenuItems for months
  };


  const yearsToRender = () => {
    return dataRender(years); // Returns MenuItems for years
  };


  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
 
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  // Update parent component with selected month and year
  const updateParent = () => {
    getMonthYear(selectedMonth, selectedYear);
  };
  const submitEventInfo =(e)=>{
    e.preventDefault();
    updateParent();
  }
useEffect(()=>{
    updateParent()
}, [])
  return (
    <Container maxWidth="sm">
      <Paper sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: 2,
      }}>
        <form onSubmit={submitEventInfo} style={{ width: '100%' }}>
          {/* Grid layout for month and year in columns */}
          <Grid container spacing={2} direction="row" justifyContent="center">
            {/* Month Selection */}
            <Grid item xs={12} sm={5}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="month">Month</InputLabel>
                <Select
                  id="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  label="Month"
                >
                  {monthToRender()} {/* Renders MenuItems for months */}
                </Select>
              </FormControl>
            </Grid>

            {/* Year Selection */}
            <Grid item xs={12} sm={5}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select
                  id="year"
                  value={selectedYear}
                  onChange={handleYearChange} 
                  label="Year"
                >
                  {yearsToRender()} {/* Renders MenuItems for years */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary" 
                  sx={{
                  backgroundColor: "purple",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkviolet",
                  },
                }}>
              Find Events
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
 