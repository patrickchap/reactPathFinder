import React, { Component } from "react";
import "./nav.css";

export class Nav extends Component {
  render() {
    const {
      setStartNode,
      setGoalNode,
      setWallNode,
      setWeightedWall,
    } = this.props;
    return (
      <div className="nav-container">
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
            {/* <a href="/#">start</a>
            <a href="/#">goal</a>
            <a href="/#">wall</a>
            <a href="/#">Weighted Wall</a> */}
            <button onClick={setStartNode}>start</button>
            <button onClick={setGoalNode}>goal</button>
            <button onClick={setWallNode}>wall</button>
            <button onClick={setWeightedWall}>Weighted Wall</button>
          </div>
        </div>

        <div className="dropdown">
          <button
            onClick={() => {
              toggleButton("myDropdown algo");
            }}
            className="dropbtn"
          >
            Algorithm
          </button>
          <div id="myDropdown algo" className="dropdown-content">
            {/* <a href="/#">bfs</a>
            <a href="/#">dij</a> */}

            <button>bfs</button>
            <button>dij</button>
          </div>
        </div>

        {/* <button>Weighted Wall</button>

        <button>bfs</button>
        <button>dij</button> */}
      </div>
    );
  }
}

export default Nav;

let toggleButton = (id) => {
  //   console.log("id " + id);
  document.getElementById(`${id}`).classList.toggle("show");
};

window.onclick = (event) => {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
