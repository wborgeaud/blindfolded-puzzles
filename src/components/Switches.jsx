import React from "react";

import Switch from "react-switch";

export default function Switches({
  toggleBoard,
  togglePieces,
  toggleSquares,
  showBoard,
  showPieces,
  showSquares,
}) {
  return (
    <div>
      <div>
        <label>
          <span>Show board</span>
          <Switch onChange={toggleBoard} checked={showBoard} />
        </label>
      </div>
      <div>
        <label>
          <span>Show squares</span>
          <Switch
            onChange={toggleSquares}
            checked={showSquares}
            disabled={!showBoard}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Show pieces</span>
          <Switch
            onChange={togglePieces}
            checked={showPieces}
            disabled={!showBoard}
          />
        </label>
      </div>
    </div>
  );
}
