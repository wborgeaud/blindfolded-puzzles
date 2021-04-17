import React from "react";

export default function ShowSolution({ onClick, setWrongPuzzle }) {
  return (
    <div style={{ padding: "0px 10px" }}>
      <button
        style={{
          borderRadius: "15px",
          background: "red",
          fontSize: "1.2rem",
          padding: "10px",
        }}
        className="hoveropacity"
        onClick={() => {
          onClick();
          setWrongPuzzle();
        }}
      >
        Solution
      </button>
    </div>
  );
}
