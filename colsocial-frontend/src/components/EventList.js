import React from "react";
import EventCard from "./EventCard";

function EventList({ events, onDelete }) {
  return (
    <div style={listContainer}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
}

const listContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

export default EventList;
