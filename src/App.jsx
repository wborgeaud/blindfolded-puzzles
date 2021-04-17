import "./App.css";

import * as ChessJS from "chess.js";

import React, { Component } from "react";

import ChessboardWithHistory from "./components/ChessboardWithHistory";
import Pieces from "./components/Pieces";
import MoveForm from "./components/MoveForm";
import Moves from "./components/Moves";
import Switches from "./components/Switches";
import ShowSolution from "./components/ShowSolution";
import Hint from "./components/Hint";
import FirstMove from "./components/FirstMove";
import Thumbs from "./components/Thumbs";
import MaxPiecesSelect from "./components/MaxPiecesSelect";
import Rating from "./components/Rating";
import { squareStyle } from "./utils/square-style";
import Hamburger from "./utils/hamburger.svg";
import updateElo from "./utils/elo";

export const URL = "https://api.blindfoldedpuzzles.xyz/puzzles/";

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
      puzzle_id: 0,
      wrong: false,
      elo: 1200,
      eloDelta: null,
    };

    this.fetchPuzzle = this.fetchPuzzle.bind(this);
    this.toggleBoard = this.toggleBoard.bind(this);
    this.togglePieces = this.togglePieces.bind(this);
    this.toggleSquares = this.toggleSquares.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.endGame = this.endGame.bind(this);
    this.historyPush = this.historyPush.bind(this);
    this.historyPop = this.historyPop.bind(this);
    this.setWrongPuzzle = this.setWrongPuzzle.bind(this);
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
      puzzle_id: data.id,
      wrong: false,
      eloDelta: null,
    });
  }

  async componentDidMount() {
    let elo = JSON.parse(window.localStorage.getItem("elo"));
    if (elo !== null) {
      this.setState({ elo: elo.elo });
    } else {
      window.localStorage.setItem("elo", JSON.stringify({ elo: 1200 }));
    }
    await this.fetchPuzzle();
  }

  toggleBoard() {
    this.setState((state) => ({
      ...state,
      showBoard: !state.showBoard,
      showPieces: false,
      showSquares: false,
    }));
    this.setWrongPuzzle();
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
    if (this.state.solved) {
      return;
    }
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
      if (!this.state.wrong) {
        let newElo = updateElo(this.state.elo, this.state.rating, 1);
        this.setState({
          elo: newElo,
          eloDelta: newElo - this.state.elo,
        });
      }
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

  setWrongPuzzle() {
    if (this.state.wrong) {
      return;
    }
    const newElo = updateElo(this.state.elo, this.state.rating, 0);
    this.setState({
      wrong: true,
      elo: newElo,
      eloDelta: newElo - this.state.elo,
    });
  }

  render() {
    return (
      <div className="main">
        <div
          id="open-sidebar"
          className="open-sidebar"
          onClick={() => {
            document.getElementById("sidebar").style.width = "150px";
            document.getElementById("open-sidebar").style.display = "none";
          }}
        >
          <img
            alt="Hamburger"
            src={Hamburger}
            style={{ height: "2rem", width: "1rem" }}
          />
        </div>
        <div className="sidebar" id="sidebar">
          <div
            className="close-sidebar"
            onClick={() => {
              document.getElementById("sidebar").style.width = "0px";
              document.getElementById("open-sidebar").style.display = "inline";
            }}
          >
            &times;
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "80%",
              width: "100px",
              minWidth: "100px",
              padding: "10px",
            }}
          >
            <div>
              <div>Maximum number of pieces</div>
              <MaxPiecesSelect
                maxPieces={this.state.maxPieces}
                setMaxPieces={({ value }) =>
                  this.setState({ maxPieces: value })
                }
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
            {this.state.solved && (
              <>
                <Thumbs puzzle_id={this.state.puzzle_id} />
                <div className="solvedname">Solved</div>
              </>
            )}
            <Switches
              toggleBoard={this.toggleBoard}
              toggleSquares={this.toggleSquares}
              togglePieces={this.togglePieces}
              showBoard={this.state.showBoard}
              showSquares={this.state.showSquares}
              showPieces={this.state.showPieces}
            />
            <Rating elo={this.state.elo} eloDelta={this.state.eloDelta} />
          </div>
        </div>

        <div
          className="height80"
          style={{
            display: "flex",
            flexDirection: "column",
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
            {this.state.turn === "W" ? (
              <span className="whitename">White</span>
            ) : (
              <span className="blackname">Black</span>
            )}{" "}
            to play
          </div>
          <div
            className="width50"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Pieces
              white_pieces={this.state.white_pieces}
              black_pieces={this.state.black_pieces}
            />
            <Moves
              moves={this.state.correctMoves}
              starting_color={this.state.turn}
            />
          </div>
          {window.innerWidth <= 800 && this.state.solved && (
            <div style={{ padding: "20px" }}>
              <Thumbs puzzle_id={this.state.puzzle_id} />
              <div className="solvedname">Solved</div>
            </div>
          )}
          <MoveForm
            correct={this.state.moves[0]}
            makeMove={this.makeMove}
            id={this.state.id}
            movesLeft={this.state.moves.length}
            setWrongPuzzle={this.setWrongPuzzle}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Hint
              firstMove={this.state.moves[0]}
              setWrongPuzzle={this.setWrongPuzzle}
            />
            <FirstMove
              onClick={this.makeMove}
              setWrongPuzzle={this.setWrongPuzzle}
            />
            <ShowSolution
              onClick={this.endGame}
              setWrongPuzzle={this.setWrongPuzzle}
            />
            {window.innerWidth < 800 && (
              <div>
                <button
                  style={{
                    borderRadius: "15px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    padding: "10px",
                  }}
                  className="hovergreen"
                  onClick={this.fetchPuzzle}
                >
                  New puzzle
                </button>
              </div>
            )}
          </div>
        </div>
        {this.state.showBoard && (
          <div
            className="chessboard"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {this.state.showPieces ? (
              <ChessboardWithHistory
                width={Math.round(
                  window.innerWidth * (window.innerWidth > 800 ? 0.3 : 0.8)
                )}
                position={this.state.fen}
                historyPop={this.historyPop}
                historyPush={this.historyPush}
              />
            ) : this.state.showSquares ? (
              <ChessboardWithHistory
                width={Math.round(
                  window.innerWidth * (window.innerWidth > 800 ? 0.3 : 0.8)
                )}
                squareStyles={squareStyle(this.state.game)}
                historyPop={this.historyPop}
                historyPush={this.historyPush}
              />
            ) : (
              <ChessboardWithHistory
                width={Math.round(
                  window.innerWidth * (window.innerWidth > 800 ? 0.3 : 0.8)
                )}
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
