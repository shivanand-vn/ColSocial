import React from "react";

function ResourceList({ resources, onDelete }) {
  const currentUserEmail = localStorage.getItem("userEmail");
  const currentUsername = currentUserEmail ? currentUserEmail.split("@")[0] : "";

  return (
    <div>
      {resources.map((resource) => (
        <div key={resource._id} style={itemStyle}>
          <h3>{resource.title}</h3>
          <a href={resource.link} target="_blank" rel="noreferrer">{resource.link}</a>
          <p style={{ fontSize: "14px", color: "gray" }}>by {resource.creatorName}</p>

          {resource.creatorName === currentUsername && (
            <button onClick={() => onDelete(resource._id)} style={deleteBtn}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const itemStyle = {
  background: "#f8f9fa",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const deleteBtn = {
  background: "#e63946",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  marginTop: "8px",
  cursor: "pointer",
};

export default ResourceList;
