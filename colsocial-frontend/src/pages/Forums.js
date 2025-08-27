import React from "react";
import useForums from "../hooks/useForums";
import ForumForm from "../components/ForumForm";
import ForumList from "../components/ForumList";

function ForumPage() {
  const { forums, addForum, deleteForum } = useForums();

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Discussion Forums</h2>
      <ForumForm onAdd={addForum} />
      <ForumList forums={forums} onDelete={deleteForum} />
    </div>
  );
}

export default ForumPage;
