import React from "react";

export default function Rating({ elo, eloDelta }) {
  return (
    <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
      Your rating: {elo}{" "}
      {eloDelta !== null &&
        (eloDelta < 0 ? (
          <span style={{ color: "red" }}>{eloDelta}</span>
        ) : (
          <span style={{ color: "green" }}>+{eloDelta}</span>
        ))}
    </div>
  );
}
