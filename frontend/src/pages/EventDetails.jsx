import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const EventDetails = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch event: ${response.statusText}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid content type, expected JSON");
        }
        const data = await response.json();
        setEvent(data.data); // Extract `data` key
        console.log(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Event Details</h1>
      {event ? (
        <div>
          <h2>{event.title}</h2>
          <p>
            Date: {event.date.year} {event.date.month} {event.date.Date}
          </p>
          <p>Location: {event.location}</p>
          <p>Description: {event.description}</p>
          <img src={event.img} alt={event.title} style={{ maxWidth: '100%' }} />
          <p>Created by: {event.createdBy}</p>
        </div>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  );
};

export default EventDetails;
