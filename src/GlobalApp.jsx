import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import App from "./App";
import About from "./components/About";

export default function GlobalApp() {
  return (
    <Router>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontWeight: "bolder",
            color: "green",
            fontSize: "1.5rem",
            backgroundColor: "#cccccc",
            boxShadow: "0px 0px 5px 0px",
            zIndex: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                padding: "5px 20px",
                color: "green",
                textShadow: "1px 1px 1px  black",
              }}
            >
              Blindfolded Puzzles
            </span>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <span
              style={{
                padding: "5px 20px",
                color: "black",
                cursor: "pointer",
                fontSize: "1.3rem",
              }}
            >
              About
            </span>
          </Link>
        </div>
        <div style={{ flexGrow: 2 }}>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
