import React, { useState } from "react";
import axios from "axios";

function ForumList({ forums, onDelete }) {
  const [replyText, setReplyText] = useState({});
  const token = localStorage.getItem("token");
  const currentUserEmail = localStorage.getItem("userEmail");
  const currentUsername = currentUserEmail ? currentUserEmail.split("@")[0] : "";

  const handleReply = async (forumId) => {
    if (!replyText[forumId]) return;
    try {
      await axios.post(
        `http://localhost:5000/forums/${forumId}/replies`,
        { text: replyText[forumId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload(); 
    } catch (err) {
      console.error("Error posting reply:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      {forums.map((forum) => (
        <div key={forum._id} style={itemStyle}>
          <h3>{forum.title}</h3>
          <p>{forum.description}</p>
          <small>by {forum.creatorName}</small>

          <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "5px" }}>Replies:</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {forum.replies && forum.replies.length > 0 ? (
                forum.replies.map((r, idx) => (
                  <li key={idx} style={replyStyle}>
                    <b>{r.username}:</b> {r.text}
                  </li>
                ))
              ) : (
                <li style={{ fontSize: "13px", color: "gray" }}>No replies yet.</li>
              )}
            </ul>
          </div>

          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText[forum._id] || ""}
              onChange={(e) =>
                setReplyText({ ...replyText, [forum._id]: e.target.value })
              }
              style={replyInput}
            />
            <button onClick={() => handleReply(forum._id)} style={replyBtn}>
              Reply
            </button>
          </div>

          {forum.creatorName === currentUsername && (
            <button onClick={() => onDelete(forum._id)} style={deleteBtnStyle}>
              Delete Forum
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

const replyStyle = {
  fontSize: "14px",
  padding: "4px 0",
  borderBottom: "1px solid #eee",
};

const replyInput = {
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginRight: "5px",
};

const replyBtn = {
  background: "#0077b6",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteBtnStyle = {
  background: "#e63946",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  marginTop: "8px",
  cursor: "pointer",
};

export default ForumList;
