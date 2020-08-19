import React, { Component } from "react";
import "./nav.css";

export class SetNodesButton extends Component {
  render() {
    const {
      setStartNode,
      setGoalNode,
      setWallNode,
      setWeightedWall,
      toggleButton,
      searchType,
    } = this.props;

    return (
      <div className="dropdown">
        <button
          onClick={() => {
            toggleButton("myDropdown");
          }}
          className="dropbtn"
        >
          Set Nodes
        </button>
        <div id="myDropdown" className="dropdown-content">
          <button onClick={setStartNode}>start</button>
          <button onClick={setGoalNode}>goal</button>
          <button onClick={setWallNode}>wall</button>
          {searchType !== "nonWeighted" && (
            <button onClick={setWeightedWall}>Weighted Wall</button>
          )}
        </div>
      </div>
    );
  }
}

export default SetNodesButton;
