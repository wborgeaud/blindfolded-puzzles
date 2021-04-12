import React from "react";

import App from "./App";

export default function GlobalApp() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          fontWeight: "bolder",
          color: "green",
          fontSize: "1.5rem",
          backgroundColor: "#cccccc",
          boxShadow: "0px 0px 5px 0px",
          zIndex: 2,
        }}
      >
        <span style={{ padding: "20px" }}>Blindfolded Puzzles</span>
      </div>
      <div style={{ flexGrow: 2 }}>
        <App />
      </div>
    </div>
  );
}
