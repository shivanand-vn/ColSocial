import React, { useState } from "react";

function ForumForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert(" Please enter both title and description");
      return;
    }

    try {
      await onAdd({ title, description });
      alert(" Forum added successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert(" Failed to add forum. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
    >
      <input
        type="text"
        placeholder="Forum Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Forum Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>
        Post
      </button>
    </form>
  );
}

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  flex: 1,
};

const btnStyle = {
  background: "#0077b6",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ForumForm;
