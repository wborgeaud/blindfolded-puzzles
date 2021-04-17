import React, { Component } from "react";

const PIECES = {
  K: "King",
  Q: "Queen",
  R: "Rook",
  B: "Bishop",
  N: "Knight",
};

const getPiece = (c) => {
  if (c[0] === c[0].toLowerCase()) {
    return "Pawn";
  } else {
    return PIECES[c.toUpperCase()];
  }
};

function Result({ visible }) {
  return (
    <div
      className="flashing longtransition"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        color: "yellow",
        textShadow: "-5px -5px black",
        zIndex: 200,
      }}
    >
      {getPiece(visible[0])}
    </div>
  );
}

export default class Hint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <div style={{ padding: "0px 10px" }}>
        <button
          style={{
            borderRadius: "15px",
            background: "yellow",
            fontSize: "1.2rem",
            padding: "10px",
          }}
          className="hoveropacity"
          onClick={() => {
            this.props.setWrongPuzzle();
            this.setState({ visible: this.props.firstMove }, () =>
              setTimeout(() => this.setState({ visible: false }), 500)
            );
          }}
        >
          Hint
        </button>
        {this.state.visible && <Result visible={this.state.visible} />}
      </div>
    );
  }
}
