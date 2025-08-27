import React from "react";

function ResourceCard({ resource, onDelete }) {
  return (
    <div style={cardStyle}>
      <h3>{resource.title}</h3>
      <a href={resource.link} target="_blank" rel="noopener noreferrer">
        🔗 Open Resource
      </a>
      <br />
      <button style={deleteBtn} onClick={() => onDelete(resource.id)}>
        Delete
      </button>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "15px",
  margin: "10px",
  width: "250px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
};

const deleteBtn = {
  background: "#e63946",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px"
};

export default ResourceCard;
