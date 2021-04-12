import React from "react";

export default function FirstMove({ onClick }) {
  return (
    <div style={{ padding: "0px 10px" }}>
      <button
        style={{
          borderRadius: "15px",
          background: "orange",
          fontSize: "1.2rem",
          padding: "10px",
        }}
        className="hoveropacity"
        onClick={onClick}
      >
        1st move
      </button>
    </div>
  );
}
