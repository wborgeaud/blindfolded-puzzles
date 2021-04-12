import "./App.css";

import * as ChessJS from "chess.js";

import React, { Component } from "react";

import Select from "react-select";

import ChessboardWithHistory from "./components/ChessboardWithHistory";
import Pieces from "./components/Pieces";
import MoveForm from "./components/MoveForm";
import Moves from "./components/Moves";
import Switches from "./components/Switches";
import ShowSolution from "./components/ShowSolution";
import Hint from "./components/Hint";
import FirstMove from "./components/FirstMove";
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
      history: [],
      maxPieces: 5,
    };

    this.fetchPuzzle = this.fetchPuzzle.bind(this);
    this.toggleBoard = this.toggleBoard.bind(this);
    this.togglePieces = this.togglePieces.bind(this);
    this.toggleSquares = this.toggleSquares.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.endGame = this.endGame.bind(this);
    this.historyPush = this.historyPush.bind(this);
    this.historyPop = this.historyPop.bind(this);
  }

  async fetchPuzzle() {
    let data = await fetch(
      URL + "?" + new URLSearchParams({ max_pieces: this.state.maxPieces })
    );
    data = await data.json();
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
      history: [],
      maxPieces: this.state.maxPieces,
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
    const history = [...this.state.history];
    while (history.length > 0) {
      this.state.game.move(history.pop());
    }
    this.state.game.move(this.state.moves[0]);
    if (this.state.moves.length === 1) {
      this.setState({
        fen: this.state.game.fen(),
        showBoard: true,
        showPieces: true,
        correctMoves: [...this.state.correctMoves, this.state.moves[0]],
        history: [...this.state.history, this.state.moves[0]],
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
        history: [...this.state.history, ...this.state.moves.slice(0, 2)],
      });
    }
  }

  endGame() {
    if (this.state.solved) {
      return;
    }
    for (const m of this.state.moves) {
      this.state.game.move(m);
      this.setState({
        fen: this.state.game.fen(),
        showBoard: true,
        showPieces: true,
        correctMoves: [...this.state.correctMoves, ...this.state.moves],
        history: [...this.state.history, ...this.state.moves],
        solved: true,
      });
    }
  }

  historyPush() {
    const m = this.state.game.undo();
    if (m === null) {
      return;
    }
    this.setState({
      history: [...this.state.history, m],
      fen: this.state.game.fen(),
    });
  }

  historyPop() {
    const history = [...this.state.history];
    if (history.length === 0) {
      return;
    }
    this.state.game.move(history.pop());
    this.setState({ history, fen: this.state.game.fen() });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#999999",
            marginRight: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "100px",
              minWidth: "100px",
              height: "80%",
              padding: "10px",
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
              <div>Maximum number of pieces</div>
              <Select
                options={[
                  { value: 3, label: 3 },
                  { value: 4, label: 4 },
                  { value: 5, label: 5 },
                  { value: 6, label: 6 },
                  { value: 7, label: 7 },
                  { value: 8, label: 8 },
                  { value: 9, label: 9 },
                  { value: 10, label: 10 },
                  { value: 11, label: 11 },
                  { value: 12, label: 12 },
                  { value: 13, label: 13 },
                  { value: 14, label: 14 },
                  { value: 15, label: 15 },
                ]}
                onChange={({ value }) => {
                  this.setState({ maxPieces: value });
                }}
                value={{
                  value: this.state.maxPieces,
                  label: this.state.maxPieces,
                }}
              />

              <button
                style={{
                  borderRadius: "15px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  padding: "10px",
                  marginTop: "50px",
                }}
                className="hovergreen"
                onClick={this.fetchPuzzle}
              >
                New puzzle
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "space-around",
            flexGrow: 2,
            alignItems: "center",
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Hint firstMove={this.state.moves[0]} />
            <FirstMove onClick={this.makeMove} />
            <ShowSolution onClick={this.endGame} />
          </div>
        </div>
        {this.state.showBoard && (
          <div style={{ padding: "50px" }}>
            {this.state.showPieces ? (
              <ChessboardWithHistory
                width="400"
                position={this.state.fen}
                historyPop={this.historyPop}
                historyPush={this.historyPush}
              />
            ) : this.state.showSquares ? (
              <ChessboardWithHistory
                width="400"
                squareStyles={squareStyle(this.state.game)}
                historyPop={this.historyPop}
                historyPush={this.historyPush}
              />
            ) : (
              <ChessboardWithHistory
                width="400"
                historyPop={this.historyPop}
                historyPush={this.historyPush}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
