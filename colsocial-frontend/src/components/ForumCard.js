import React from "react";
import ReplyForm from "./ReplyForm";

function ForumCard({ forum, onReply }) {
  return (
    <div style={cardStyle}>
      <h3>❓ {forum.question}</h3>
      <div style={{ marginLeft: "20px" }}>
        <h4>Replies:</h4>
        {forum.replies.length === 0 ? (
          <p>No replies yet.</p>
        ) : (
          <ul>
            {forum.replies.map((r, idx) => (
              <li key={idx}> {r}</li>
            ))}
          </ul>
        )}
      </div>
      <ReplyForm onReply={(reply) => onReply(forum.id, reply)} />
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "15px",
  margin: "10px 0",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
};

export default ForumCard;
