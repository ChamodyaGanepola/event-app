import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function EventCard({
  eventId,
  title,
  date,
  location,
  img,
  createdBy,
}) {
  const { year, month, Date } = date; // Ensure date is passed in the correct structure
  console.log("eventId", eventId);
  console.log("eventId", title);
  return (
    <Link to={`/events/${eventId}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: 300,
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "16px",
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          height="180"
          image={img}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {year} | Month: {month} | Day: {Date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created by: {createdBy}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
