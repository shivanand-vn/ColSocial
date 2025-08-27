import { useEffect, useState } from "react";
import axios from "axios";

function useForums() {
  const [forums, setForums] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch forums
  useEffect(() => {
    axios
      .get("http://localhost:5000/forums")
      .then((res) => setForums(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add forum
  const addForum = async (forum) => {
    try {
      const res = await axios.post("http://localhost:5000/forums", forum, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForums([...forums, res.data]); 
    } catch (err) {
      console.error(err);
      throw err; 
    }
  };

  // Delete forum
  const deleteForum = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/forums/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForums(forums.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return { forums, addForum, deleteForum };
}

export default useForums;
