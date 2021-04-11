import React from "react";

import App from "./App";

export default function GlobalApp() {
  return (
    <div>
      <div
        style={{
          fontWeight: "bolder",
          color: "green",
          fontSize: "1.5rem",
          backgroundColor: "#cccccc",
          boxShadow: "0px 0px 5px 0px",
        }}
      >
        Blindfolded Puzzles
      </div>
      <div style={{ padding: "20px" }}>
        <App />
      </div>
    </div>
  );
}
