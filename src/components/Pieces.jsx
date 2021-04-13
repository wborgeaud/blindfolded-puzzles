import React from "react";

import Svgs from "../utils/pieces-svg";

const Symbols = ["k", "q", "r", "b", "n", "p"];

function Piece({ color, symbol, squares }) {
  return (
    <div
      style={{
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1.3rem",
      }}
    >
      <div style={{ transform: "scale(1.5)", padding: "10px" }}>
        {Svgs[color + symbol.toUpperCase()]}
      </div>
      {squares.join(", ")}
    </div>
  );
}

export default function Pieces({ white_pieces, black_pieces }) {
  return (
    <div>
      <div style={{ padding: "15px", display: "flex", flexDirection: "row" }}>
        {Symbols.filter((p) => white_pieces[p]?.length > 0).map((p) => (
          <Piece key={"w" + p} color="w" symbol={p} squares={white_pieces[p]} />
        ))}
      </div>

      <div style={{ padding: "15px", display: "flex", flexDirection: "row" }}>
        {Symbols.filter((p) => black_pieces[p]?.length > 0).map((p) => (
          <Piece key={"b" + p} color="b" symbol={p} squares={black_pieces[p]} />
        ))}
      </div>
    </div>
  );
}
