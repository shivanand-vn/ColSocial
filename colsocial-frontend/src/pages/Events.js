import React from "react";
import useEvents from "../hooks/useEvents";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

function Events() {
  const { events, addEvent, deleteEvent, loading, error } = useEvents();

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2> Campus Events</h2>
      <EventForm onAdd={addEvent} />
      <EventList events={events} onDelete={deleteEvent} />
    </div>
  );
}

export default Events;
