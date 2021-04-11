import "./App.css";

import Chessboard from "chessboardjsx";
import * as ChessJS from "chess.js";

import React, { Component } from "react";

import Pieces from "./components/Pieces";
import MoveForm from "./components/MoveForm";
import Moves from "./components/Moves";
import Switches from "./components/Switches";
import { squareStyle } from "./utils/square-style";

const URL = "http://localhost:8000/puzzles/";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: "",
      white_pieces: {},
      black_pieces: {},
      moves: [],
      correctMoves: [],
      turn: "",
      showBoard: false,
      showPieces: false,
      showSquares: false,
      game: null,
      solved: false,
    };

    this.fetchPuzzle = this.fetchPuzzle.bind(this);
    this.toggleBoard = this.toggleBoard.bind(this);
    this.togglePieces = this.togglePieces.bind(this);
    this.toggleSquares = this.toggleSquares.bind(this);
    this.makeMove = this.makeMove.bind(this);
  }

  async fetchPuzzle() {
    let data = await fetch(URL + "?" + new URLSearchParams({ max_pieces: 5 }));
    data = await data.json();
    console.log(data);
    const game = new Chess(data.starting_fen);
    this.setState({
      ...data,
      showBoard: false,
      showPieces: false,
      showSquares: false,
      fen: data.starting_fen,
      game,
      solved: false,
      correctMoves: [],
    });
  }

  async componentDidMount() {
    await this.fetchPuzzle();
  }

  toggleBoard() {
    this.setState((state) => ({
      ...state,
      showBoard: !state.showBoard,
      showPieces: false,
      showSquares: false,
    }));
  }

  togglePieces() {
    this.setState((state) => ({
      ...state,
      showPieces: !state.showPieces,
    }));
  }

  toggleSquares() {
    this.setState((state) => ({
      ...state,
      showSquares: !state.showSquares,
    }));
  }

  makeMove() {
    this.state.game.move(this.state.moves[0]);
    if (this.state.moves.length === 1) {
      this.setState({
        fen: this.state.game.fen(),
        showBoard: true,
        showPieces: true,
        correctMoves: [...this.state.correctMoves, this.state.moves[0]],
        solved: true,
      });
    } else {
      this.state.game.move(this.state.moves[1]);
      this.setState({
        fen: this.state.game.fen(),
        moves: this.state.moves.slice(2),
        correctMoves: [
          ...this.state.correctMoves,
          ...this.state.moves.slice(0, 2),
        ],
      });
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "space-around",
            marginRight: "40px",
            padding: "10px",
            backgroundColor: "#999999",
            width: "100px",
            minWidth: "100px",
          }}
        >
          <Moves
            moves={this.state.correctMoves}
            starting_color={this.state.turn}
          />
          {this.state.solved && (
            <div
              style={{ fontWeight: "bold", color: "green", fontSize: "2rem" }}
            >
              Solved
            </div>
          )}
          <Switches
            toggleBoard={this.toggleBoard}
            toggleSquares={this.toggleSquares}
            togglePieces={this.togglePieces}
            showBoard={this.state.showBoard}
            showSquares={this.state.showSquares}
            showPieces={this.state.showPieces}
          />
          <div>
            <div>Max number of pieces slider</div>
            <button onClick={this.fetchPuzzle}>New puzzle</button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "space-around",
            flexGrow: 2,
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {this.state.turn === "W" ? "White " : "Black "} to play
          </div>
          <Pieces
            white_pieces={this.state.white_pieces}
            black_pieces={this.state.black_pieces}
          />
          <MoveForm
            correct={this.state.moves[0]}
            makeMove={this.makeMove}
            id={this.state.id}
            movesLeft={this.state.moves.length}
          />
        </div>
        {this.state.showBoard && (
          <div style={{ padding: "50px" }}>
            {this.state.showPieces ? (
              <Chessboard width="400" position={this.state.fen} />
            ) : this.state.showSquares ? (
              <Chessboard
                width="400"
                squareStyles={squareStyle(this.state.game)}
              />
            ) : (
              <Chessboard width="400" />
            )}
          </div>
        )}
      </div>
    );
  }
}
