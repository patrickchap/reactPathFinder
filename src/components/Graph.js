import React, { Component } from "react";
import Node from "./Node";
import "./graph.css";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startSet: false,
      endSet: false,
      mouseDown: false,
    };
  }

  findStartingNode = () => {
    const { Dim } = this.props;
    for (let row = 0; row < Dim.ROW; row++) {
      for (let col = 0; col < Dim.COL; col++) {
        // console.log(this.state.grid[row][col])
        if (this.props.grid[row][col].classification === "start-node") {
          console.log(`${row}, ${col}`);
          return { row, col };
        }
      }
    }
  };

  findGoalNode = () => {
    const { Dim } = this.props;
    for (let row = 0; row < Dim.ROW; row++) {
      for (let col = 0; col < Dim.COL; col++) {
        // console.log(this.state.grid[row][col])
        if (this.props.grid[row][col].classification === "goal-node") {
          console.log(`${row}, ${col}`);
          return { row, col };
        }
      }
    }
  };

  handleClick(row, col) {
    const { setStart, setGoal } = this.props.setNode;
    const { startNode, goalNode } = this.props;

    if (setStart) {
      // Check if there is already a start node set
      if (this.state.startSet) {
        //get row and colomn of previes start node and set to white
        const { row, col } = this.findStartingNode();
        removeSetNode(this.props.grid, row, col);
        // this.setState({grid: newGrid});
      }
      //set starting node green
      addStartingNod(this.props.grid, row, col, startNode);
      this.setState({ startSet: true });
    } else if (setGoal) {
      if (this.state.endSet) {
        const { row, col } = this.findGoalNode();
        removeSetNode(this.props.grid, row, col);
      }
      addGoalNode(this.props.grid, row, col, goalNode);
      this.setState({ endSet: true });
    }

    this.props.setOriginalState();
  }

  handleMouseDown(row, col) {
    const { setWall, setWeightedWall } = this.props.setNode;
    if (setWall) {
      this.setState({ mouseDown: true });

      const newGrid = addWallNode(this.props.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (setWeightedWall) {
      this.setState({ mouseDown: true });
      const newGrid = addWeightedWall(this.props.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }
  handleMouseEnter(row, col) {
    const { setWall, setWeightedWall } = this.props.setNode;
    console.log(`${setWall} ${setWeightedWall}   ${this.state.mouseDown} `);
    if (setWall && this.state.mouseDown) {
      const newGrid = addWallNode(this.props.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (setWeightedWall && this.state.mouseDown) {
      const newGrid = addWeightedWall(this.props.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp(row, col) {
    const { setWall, setWeightedWall } = this.props.setNode;
    if (setWall) {
      const newGrid = addWallNode(this.props.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (setWeightedWall) {
      const newGrid = addWeightedWall(this.props.grid, row, col);
      this.setState({ grid: newGrid });
      // this.props.setOriginalState();
    }

    this.setState({ mouseDown: false });
  }

  render() {
    const { grid } = this.props;
    return (
      <div className="graph">
        {grid.map((row, rowIdx) => {
          return (
            <div className="grid_row" key={rowIdx}>
              {row.map((node, nodeIndex) => {
                const {
                  row,
                  col,
                  classification,
                  neighbors,
                  isVisited,
                  nodeComeFrom,
                } = node;
                return (
                  <Node
                    key={nodeIndex}
                    col={col}
                    row={row}
                    // setNode={this.props.setNode}
                    setOriginalState={this.props.setOriginalState}
                    click={(row, col) => {
                      this.handleClick(row, col);
                    }}
                    mouseDown={(row, col) => {
                      this.handleMouseDown(row, col);
                    }}
                    mouseEnter={(row, col) => {
                      this.handleMouseEnter(row, col);
                    }}
                    mouseUp={(row, col) => {
                      this.handleMouseUp(row, col);
                    }}
                    classification={classification}
                    neighbors={neighbors}
                    isVisited={isVisited}
                    nodeComeFrom={nodeComeFrom}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const addStartingNod = (grid, row, col, startNode) => {
  // const {setStart} = props;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  node.classification = "start-node";
  startNode(node);
};

//used when a start or goal node has already been set
//sets teh classification back to ''
const removeSetNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  node.classification = "";
};

const addGoalNode = (grid, row, col, goalNode) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  node.classification = "goal-node";
  console.log(node);
  goalNode(node);
};

const addWallNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  node.classification = "wall-node";
};

const addWeightedWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  node.classification = "set-weighted-wall";
};
