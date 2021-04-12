import React, { Component } from "react";

function Result({ visible }) {
  return (
    <div
      className="flashing"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        color: visible === "Wrong!" ? "red" : "green",
      }}
    >
      {visible}
    </div>
  );
}

export default class MoveForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", result: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ value: "" });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (
      ["", "+", "#"].some((suffix) =>
        [this.props.correct, this.props.correct.replace("x", "")].some(
          (correct) =>
            this.state.value.toUpperCase() + suffix === correct.toUpperCase()
        )
      )
    ) {
      this.setState(
        { result: this.props.movesLeft === 1 ? "Solved!" : "Correct!" },
        () => setTimeout(() => this.setState({ result: false }), 500)
      );
      this.props.makeMove();
    } else {
      this.setState({ result: "Wrong!" }, () =>
        setTimeout(() => this.setState({ result: false }), 500)
      );
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>
            <input
              style={{
                borderRadius: "15px",
                height: "6rem",
                fontSize: "3rem",
                width: "100%",
                textAlign: "center",
              }}
              placeholder="Move"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
            }}
          >
            <button
              style={{
                borderRadius: "15px",
                background: "lightblue",
                fontSize: "2rem",
              }}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        <Result visible={this.state.result} />
      </div>
    );
  }
}
