import React, { Component } from "react";
import "./nav.css";
import bfs from "../../components/unWeightedSearch/bfs";
import { dijkstra } from "../../components/weightedSearch/dijkstra";
import SetNodesButton from "./SetNodesButton";
import Run from "./Run";

export class Nav extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     algoToRun: "",
  //   };
  // }

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
  }

  runBfs = (grid, startNode, goalNode) => {
    if (startNode == null || goalNode == null) {
      alert("set start and goal");
      return;
    }

    this.setNeighbors();
    const { visitedNodes, shortestPath } = bfs(grid, startNode, goalNode);
    this.drowShortestPath(visitedNodes, shortestPath);
  };

  runDijkstra = (grid, startNode, goalNode) => {
    if (startNode == null || goalNode == null) {
      alert("set start and goal");
      return;
    }

    this.setNeighbors();
    const { visitedNodes, shortestPath } = dijkstra(grid, startNode, goalNode);
    this.drowShortestPath(visitedNodes, shortestPath);
  };

  render() {
    const {
      setStartNode,
      setGoalNode,
      setWallNode,
      setWeightedWall,
      grid,
      startNode,
      goalNode,
      algoToRun,
      resetGrid,
    } = this.props;

    // const { algoToRun } = this.state;

    return (
      <div className="nav-container">
        {algoToRun === "bfs" && (
          <>
            <SetNodesButton
              toggleButton={toggleButton}
              setStartNode={setStartNode}
              setGoalNode={setGoalNode}
              setWallNode={setWallNode}
              setWeightedWall={setWeightedWall}
              searchType={"nonWeighted"}
            />
            <Run
              name="BFS"
              algo={this.runBfs}
              grid={grid}
              startNode={startNode}
              goalNode={goalNode}
            />
            <button className="nav__run" onClick={resetGrid}>
              Reset Grid
            </button>
          </>
        )}
        {algoToRun === "dij" && (
          <>
            <SetNodesButton
              toggleButton={toggleButton}
              setStartNode={setStartNode}
              setGoalNode={setGoalNode}
              setWallNode={setWallNode}
              setWeightedWall={setWeightedWall}
              searchType={"Weighted"}
            />
            <Run
              className="runButton"
              name="Dijkstra"
              algo={this.runDijkstra}
              grid={grid}
              startNode={startNode}
              goalNode={goalNode}
            />
            <button className="nav__run" onClick={resetGrid}>
              Reset Grid
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Nav;

let toggleButton = (id) => {
  // console.log("id " + id);
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
