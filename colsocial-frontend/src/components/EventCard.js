import React from "react";

function EventCard({ event, onDelete }) {
  const currentUserEmail = localStorage.getItem("userEmail");
  const currentUsername = currentUserEmail ? currentUserEmail.split("@")[0] : "";

  const handleDelete = async () => {
    await onDelete(event._id);
    alert(`🗑️ Event "${event.title}" deleted successfully!`);
  };

  return (
    <div style={cardStyle}>
      <h3>{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>Created by: {event.creatorName}</p>

      {currentUsername === event.creatorName && (
        <button style={btnStyle} onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "10px",
  width: "220px",
  textAlign: "center",
};

const btnStyle = {
  marginTop: "10px",
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default EventCard;
