import React, { Component } from "react";
import "./nav.css";

export class AlgoButton extends Component {
  render() {
    return (
      <div className="dropdown">
        <button
          onClick={() => {
            this.props.toggleButton("myDropdown algo");
          }}
          className="dropbtn"
        >
          Algorithm
        </button>
        <div id="myDropdown algo" className="dropdown-content">
          <button
            onClick={() => {
              this.props.setAlgoToRun("bfs");

              //   this.runBfs(grid, startNode, goalNode);
            }}
          >
            bfs
          </button>
          <button
            onClick={() => {
              this.props.setAlgoToRun("dij");
              //   this.runDijkstra(grid, startNode, goalNode);
            }}
          >
            dij
          </button>
        </div>
      </div>
    );
  }
}

export default AlgoButton;
