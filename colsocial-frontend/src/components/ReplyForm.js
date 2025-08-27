import React, { useState } from "react";

function ReplyForm({ onReply }) {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reply) return;
    onReply(reply);
    setReply("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>Reply</button>
    </form>
  );
}

const inputStyle = {
  padding: "6px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginRight: "5px"
};

const btnStyle = {
  background: "#38b000",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default ReplyForm;
