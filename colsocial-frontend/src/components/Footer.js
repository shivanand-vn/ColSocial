import React from "react";

function Footer() {
  return (
    <footer style={{ background: "#4a1c1cff", color: "white", textAlign: "center", padding: "1px" }}>
      <p>© {new Date().getFullYear()} ColSocial - Campus Community Portal</p>
    </footer>
  );
}

export default Footer;
