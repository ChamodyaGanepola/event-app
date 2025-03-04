import React from "react";
import { MenuItem } from '@mui/material';

export const dataRender = (dataArray) => {
  return dataArray.map((data, index) => (
    <MenuItem key={index} value={data}>
      {data}
    </MenuItem>
  ));
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [2025, 2026];
