import React from "react";
import Select from "react-select";

const OPTIONS = [...Array(30).keys()].map((i) => ({
  value: i + 3,
  label: i + 3,
}));

export default function MaxPiecesSelect({ maxPieces, setMaxPieces }) {
  return (
    <Select
      options={OPTIONS}
      onChange={setMaxPieces}
      value={{
        value: maxPieces,
        label: maxPieces,
      }}
    />
  );
}
