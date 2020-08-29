import React from "react";
import "./HomeScreen.css";
// import { useHistory } from "react-router-dom";

const HomeScreen = ({ setAlgoToRun }) => {
  //   let history = useHistory();

  const onButtonClick = (e) => {
    console.log(e.target.value);
    setAlgoToRun(e.target.value);
    // history.push("/grid");
  };
  return (
    <div className="homeScreen">
      {/* <div className="homeScreen__btn"> */}
      <button
        className="homeScreen__btn"
        value="bfs"
        onClick={(e) => onButtonClick(e)}
      >
        BFS
      </button>
      <button
        className="homeScreen__btn"
        value="dij"
        onClick={(e) => onButtonClick(e)}
      >
        Dij
      </button>
      {/* </div> */}
    </div>
  );
};

export default HomeScreen;
