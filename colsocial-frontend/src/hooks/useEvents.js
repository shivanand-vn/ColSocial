import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/events";

function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Load events
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Add event
  const addEvent = async (title, date) => {
    try {
      const res = await axios.post(
        API_URL,
        { title, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents([...events, res.data]);
    } catch {
      setError("Failed to add event");
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_URL}/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e.id !== eventId));
    } catch {
      setError("Failed to delete event");
    }
  };

  return { events, addEvent, deleteEvent, loading, error };
}

export default useEvents;
