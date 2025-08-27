import React, { useState } from "react";

function EventForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    onAdd(title, date);
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>Add Event</button>
    </form>
  );
}

const formStyle = {
  margin: "20px 0",
  display: "flex",
  gap: "10px",
  justifyContent: "center"
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btnStyle = {
  background: "#0077b6",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default EventForm;
