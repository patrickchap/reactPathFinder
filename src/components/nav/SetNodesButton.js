import React, { Component } from "react";
import "./nav.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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
          <ArrowDropDownIcon />
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
