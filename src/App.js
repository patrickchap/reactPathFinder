import React, { Component } from "react";

import "./App.css";
import Graph from "./components/Graph";
import bfs from "./components/unWeightedSearch/bfs";
import { dijkstra } from "./components/weightedSearch/dijkstra";
import Nav from "./components/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {
      setStart: false,
      setGoal: false,
      setWall: false,
      setWeightedWall: false,
      grid: [],
      startNode: null,
      goalNode: null,
      Dim: {
        ROW: 40,
        COL: 20,
      },
    };
  }

  componentDidMount() {
    const newGrid = createGrid(this.state);
    this.setState({ grid: newGrid });
  }

  //sets the starting node when clicked on graph
  setStart = (node) => {
    this.setState({ startNode: node });
  };

  //sets the goal node when clicked on graph
  setGoal = (node) => {
    this.setState({ goalNode: node });
  };

  //flag to see wehn the set start node button has been clicked
  setStartNode = () => {
    this.setState({
      setStart: true,
    });
  };

  //flag to see wehn the goal start node button has been clicked
  setGoalNode = () => {
    this.setState({
      setGoal: true,
    });
  };

  //flag used for setting wall button
  setWallNode = () => {
    this.setOriginalState();
    this.setState({
      setWall: true,
    });
  };

  setWeightedWall = () => {
    this.setOriginalState();
    this.setState({
      setWeightedWall: true,
    });
  };

  //reset flags after buttons have been pressed
  setOriginalState = () => {
    this.setState({
      setStart: false,
      setGoal: false,
      setWall: false,
      setWeightedWall: false,
    });
  };

  runDijkstra(grid, startNode, goalNode) {
    if (startNode == null || goalNode == null) {
      alert("set start and goal");
      return;
    }

    this.setNeighbors();
    const { visitedNodes, shortestPath } = dijkstra(grid, startNode, goalNode);
    this.drowShortestPath(visitedNodes, shortestPath);
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

  //used for search algorims
  //sets the n,e,w,s neighbor for each node
  setNeighbors() {
    const { grid, Dim } = this.state;

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
    this.setState({ grid: grid });
  }

  render() {
    const { setStart, setGoal, setWall, setWeightedWall } = this.state;
    return (
      <>
        <Nav
          setStartNode={this.setStartNode}
          setGoalNode={this.setGoalNode}
          setWallNode={this.setWallNode}
          setWeightedWall={this.setWeightedWall}
        />

        <button onClick={this.setStartNode}>Set Start Node</button>
        <button onClick={this.setGoalNode}>Set Goal Node</button>
        <button onClick={this.setWallNode}>Set wall Node</button>
        <button onClick={this.setWeightedWall}>Set Weighted Wall Node</button>
        <button
          onClick={() => {
            this.runBfs(
              this.state.grid,
              this.state.startNode,
              this.state.goalNode
            );
          }}
        >
          Run Bfs
        </button>
        <button
          onClick={() => {
            this.runDijkstra(
              this.state.grid,
              this.state.startNode,
              this.state.goalNode
            );
          }}
        >
          Run Dijkstra
        </button>

        <div className="App">
          <Graph
            setNode={{ setStart, setGoal, setWall, setWeightedWall }}
            setOriginalState={this.setOriginalState}
            grid={this.state.grid}
            setGrid={this.setGrid}
            startNode={this.setStart}
            goalNode={this.setGoal}
            Dim={this.state.Dim}
          />
        </div>
      </>
    );
  }
}

const createGrid = (state) => {
  const grid = [];
  const { Dim } = state;
  for (let row = 0; row < Dim.ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < Dim.COL; col++) {
      currentRow.push(createNode(col, row, "", [], false, null, Infinity));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (
  col,
  row,
  classification,
  neighbors,
  isVisited,
  nodeComeFrom,
  distance
) => {
  return {
    col,
    row,
    classification,
    neighbors,
    isVisited,
    nodeComeFrom,
    distance,
  };
};

export default App;
