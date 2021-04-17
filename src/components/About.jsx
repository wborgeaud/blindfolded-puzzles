import React from "react";

export default function About() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        fontWeight: "600",
        lineHeight: 2,
      }}
    >
      {/* Welcome to <span style={{ color: "green" }}>Blindfolded puzzles</span>! And enjoy the ride amongst us. */}
      <div style={{ maxWidth: "80%", textAlign: "justify" }}>
        Blindfolded Puzzles is an app to train your chess visualization by
        solving puzzles without a board.
        <br />
        It is inspired by{" "}
        <a
          style={{ color: "green" }}
          href="https://www.reddit.com/r/chess/comments/mnd70o/try_doing_this_puzzle_without_using_a_board/"
        >
          this
        </a>{" "}
        Reddit post from user{" "}
        <a
          style={{ color: "green" }}
          href="https://www.reddit.com/user/HariGeri69/"
        >
          HariGeri69
        </a>
        .
        <br />
        Puzzles are taken from the{" "}
        <a
          style={{ color: "green" }}
          href="https://database.lichess.org/#puzzles"
        >
          Lichess database
        </a>
        .
        <br />
        The app is fully open-source. The frontend is available{" "}
        <a
          style={{ color: "green" }}
          href="https://github.com/wborgeaud/blindfolded-puzzles"
        >
          here
        </a>{" "}
        and the backend is available{" "}
        <a
          style={{ color: "green" }}
          href="https://github.com/wborgeaud/blindfolded-puzzles-backend"
        >
          here
        </a>
        . Contributions and feedback are welcome.
      </div>
      <div style={{ marginTop: "50px" }}>Enjoy!</div>
    </div>
  );
}
