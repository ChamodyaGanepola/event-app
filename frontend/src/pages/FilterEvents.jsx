import React, { useState } from "react";
import FilterBox from "../components/FilterBox";
import SearchEventList from "../components/SearchEventList";
import { Box, Typography } from "@mui/material";


export default function FilterEvents() {

  const [monthYear, setMonthYear] = useState({
    selectedMonth: null,
    selectedYear: null,
  });

  const getMonthYear = (selectedMonth, selectedYear) => {
    setMonthYear({ selectedMonth, selectedYear });
    console.log(selectedMonth);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5fa",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      

      {/* FilterBox */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px",
        }}
      >
        <FilterBox getMonthYear={getMonthYear} />
      </Box>

      {/* SearchEventList */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <SearchEventList monthYear={monthYear} />
      </Box>
    </Box>
  );
}
