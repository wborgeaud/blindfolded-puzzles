import React from "react";
import Chessboard from "chessboardjsx";

export default function ChessboardWithHistory({
  position,
  width,
  squareStyles,
  historyPop,
  historyPush,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Chessboard
        width={width}
        position={position}
        squareStyles={squareStyles}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div
          onClick={historyPush}
          style={{ fontSize: "2rem", fontWeight: 1000 }}
        >
          {" "}
          {"<"}{" "}
        </div>
        <div
          onClick={historyPop}
          style={{ fontSize: "2rem", fontWeight: 1000 }}
        >
          {" "}
          {">"}{" "}
        </div>
      </div>
    </div>
  );
}
