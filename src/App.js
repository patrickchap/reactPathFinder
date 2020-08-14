import React, { Component } from "react";

import "./App.css";
import Graph from "./components/Graph";
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

  render() {
    const {
      setStart,
      setGoal,
      setWall,
      setWeightedWall,
      grid,
      startNode,
      goalNode,
      Dim,
    } = this.state;
    return (
      <>
        <Nav
          setStartNode={this.setStartNode}
          setGoalNode={this.setGoalNode}
          setWallNode={this.setWallNode}
          setWeightedWall={this.setWeightedWall}
          grid={grid}
          startNode={startNode}
          goalNode={goalNode}
          Dim={Dim}
        />

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
