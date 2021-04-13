import React, { useState } from "react";

import ThumbsUp from "../utils/thumbs_up.svg";
import ThumbsDown from "../utils/thumbs_down.svg";
import { URL } from "../App";

export default function Thumbs({ puzzle_id }) {
  const [rated, setRated] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <img
        src={ThumbsUp}
        alt="thumbs up"
        className="hoverbig"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (rated) {
            alert("You have already rated this puzzle.");
            return;
          }
          setRated(true);
          fetch(
            URL +
              "rate" +
              "?" +
              new URLSearchParams({ puzzle_id, rating: "good" })
          );
        }}
      />
      <img
        src={ThumbsDown}
        alt="thumbs down"
        style={{ cursor: "pointer" }}
        className="hoverbigdown "
        onClick={() => {
          if (rated) {
            alert("You have already rated this puzzle.");
            return;
          }
          setRated(true);
          fetch(
            URL +
              "rate" +
              "?" +
              new URLSearchParams({ puzzle_id, rating: "bad" })
          );
        }}
      />
    </div>
  );
}
