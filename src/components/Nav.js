import React, { Component } from "react";
import "./nav.css";
import bfs from "../components/unWeightedSearch/bfs";
import { dijkstra } from "../components/weightedSearch/dijkstra";

export class Nav extends Component {
  drowShortestPath(visitedNodes, shortestPath) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.drawShortesPath(shortestPath);
        }, 3 * i);
        return;
      }
      setTimeout(() => {
        var node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node set-search";
      }, 3 * i);
    }
  }

  drawShortesPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        var node = shortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node set-path";
      }, 20 * i);
    }
  }

  setNeighbors() {
    const { grid, Dim } = this.props;

    for (let row = 0; row < Dim.ROW; row++) {
      for (let col = 0; col < Dim.COL; col++) {
        var currentNode = grid[row][col];

        if (row > 0) {
          var nodeAbove = grid[row - 1][col];
          if (nodeAbove.classification !== "wall-node") {
            currentNode.neighbors.push(nodeAbove);
          }
        }
        if (row < Dim.ROW - 1) {
          var nodeBelow = grid[row + 1][col];
          if (nodeBelow.classification !== "wall-node") {
            currentNode.neighbors.push(nodeBelow);
          }
        }
        if (col > 0) {
          var nodeLeft = grid[row][col - 1];
          if (nodeLeft.classification !== "wall-node") {
            currentNode.neighbors.push(nodeLeft);
          }
        }
        if (col < Dim.COL - 1) {
          var nodeRight = grid[row][col + 1];
          if (nodeRight.classification !== "wall-node") {
            currentNode.neighbors.push(nodeRight);
          }
        }
      }
    }
    // this.setState({ grid: grid });
  }

  runBfs(grid, startNode, goalNode) {
    if (startNode == null || goalNode == null) {
      alert("set start and goal");
      return;
    }

    this.setNeighbors();
    const { visitedNodes, shortestPath } = bfs(grid, startNode, goalNode);
    this.drowShortestPath(visitedNodes, shortestPath);
  }

  runDijkstra(grid, startNode, goalNode) {
    if (startNode == null || goalNode == null) {
      alert("set start and goal");
      return;
    }

    this.setNeighbors();
    const { visitedNodes, shortestPath } = dijkstra(grid, startNode, goalNode);
    this.drowShortestPath(visitedNodes, shortestPath);
  }

  render() {
    const {
      setStartNode,
      setGoalNode,
      setWallNode,
      setWeightedWall,
      grid,
      startNode,
      goalNode,
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

            <button
              onClick={() => {
                this.runBfs(grid, startNode, goalNode);
              }}
            >
              bfs
            </button>
            <button
              onClick={() => {
                this.runDijkstra(grid, startNode, goalNode);
              }}
            >
              dij
            </button>
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
