import React from "react";
import { Link } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import useForums from "../hooks/useForums";
import useResources from "../hooks/useResources";

function HomePage() {
  const { events } = useEvents();
  const { forums } = useForums();
  const { resources } = useResources();

  const token = localStorage.getItem("token");

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>🎓 Welcome to ColSocial</h2>

      <div style={sectionStyle}>
        <h3>
          <Link to="/events" style={linkStyle}>
            📅 Latest Events
          </Link>
        </h3>
        {token ? (
          events.length > 0 ? (
            <ul>
              {events.map((e) => (
                <li key={e._id}>
                  <strong>{e.title}</strong> — {e.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events yet.</p>
          )
        ) : null}
      </div>

      <div style={sectionStyle}>
        <h3>
          <Link to="/forums" style={linkStyle}>
            💬 Latest Forums
          </Link>
        </h3>
        {token ? (
          forums.length > 0 ? (
            <ul>
              {forums.map((f) => (
                <li key={f._id}>
                  <strong>{f.title}</strong> — {f.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No forums yet.</p>
          )
        ) : null}
      </div>

      <div style={sectionStyle}>
        <h3>
          <Link to="/resources" style={linkStyle}>
            📚 Latest Resources
          </Link>
        </h3>
        {token ? (
          resources.length > 0 ? (
            <ul>
              {resources.map((r) => (
                <li key={r._id}>
                  <a href={r.link} target="_blank" rel="noreferrer">
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No resources yet.</p>
          )
        ) : null}
      </div>
    </div>
  );
}

const sectionStyle = {
  background: "#f9f9f9",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#0077b6",
};

export default HomePage;
