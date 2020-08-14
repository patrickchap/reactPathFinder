import React, { Component } from "react";
import "./node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      row,
      click,
      mouseDown,
      mouseEnter,
      mouseUp,
      classification,
    } = this.props;

    return (
      <div
        className={`node ${classification}`}
        id={`node-${row}-${col}`}
        onClick={() => {
          click(row, col);
        }}
        onMouseDown={() => {
          mouseDown(row, col);
        }}
        onMouseEnter={() => {
          mouseEnter(row, col);
        }}
        onMouseUp={() => {
          mouseUp(row, col);
        }}
      ></div>
    );
  }
}
