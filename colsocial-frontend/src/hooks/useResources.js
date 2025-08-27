import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/resources";

function useResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    axios
      .get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setResources(res.data))
      .catch(() => setError("Failed to load resources"))
      .finally(() => setLoading(false));
  }, [token]);

  const addResource = async (resource) => {
    try {
      const res = await axios.post(API_URL, resource, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources((prev) => [...prev, res.data]);
      alert(" Resource added successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add resource");
    }
  };


  const deleteResource = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources((prev) => prev.filter((r) => r._id !== id));
      alert(" Resource deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete resource");
    }
  };

  return { resources, addResource, deleteResource, loading, error };
}

export default useResources;
