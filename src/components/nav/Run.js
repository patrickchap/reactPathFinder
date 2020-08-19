import React, { Component } from "react";
import "./nav.css";

export class Run extends Component {
  render() {
    const { name, algo, grid, startNode, goalNode } = this.props;
    let algoName = name;
    return (
      <button
        className="runAlgorithm"
        onClick={() => {
          algo(grid, startNode, goalNode);
        }}
      >
        {`Run ${algoName}`}
      </button>
    );
  }
}

export default Run;
