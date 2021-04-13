import React from "react";

export default function Moves({ moves, starting_color }) {
  const chunks = [];

  let index = 0;
  if (starting_color === "B") {
    chunks.push(["-", moves.length > 0 ? moves[0] : ""]);
    index = 1;
  }
  for (let i = index; i < moves.length; i += 2) {
    chunks.push(moves.slice(i, i + 2));
  }

  return (
    <table style={{ fontSize: "1.3rem", width: "150px", textAlign: "center" }}>
      <thead>
        <tr>
          <th colSpan="2" style={{ fontWeight: "bolder" }}>
            Moves <hr style={{ backgroundColor: "black" }} />
          </th>
        </tr>
      </thead>
      <tbody style={{ fontStyle: "italic" }}>
        {chunks.map((chunk, i) => (
          <tr key={i}>
            <td>{chunk[0]}</td>
            <td>{chunk[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
