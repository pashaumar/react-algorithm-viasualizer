import React, { useState } from "react";
import styles from "./Main.module.css";
import BubbleSort from "../algorithm/bubbleSort/BubbleSort";
import SelectionSort from "../algorithm/selectionSort/SelectionSort";
function Main() {
  const [algorithm, setAlgorithm] = useState("bubble-sort");
  const activeButtonStyle = {
    color: "white",
    backgroundColor: "rgba(238, 82, 83,1.0)",
    border: "none",
  };
  return (
    <div className={styles.main}>
      <h4>Select Algorithm here</h4>
      <div className={styles.buttons}>
        <button
          style={algorithm === "bubble-sort" ? activeButtonStyle : {}}
          onClick={() => setAlgorithm("bubble-sort")}
        >
          BUBBLE SORT
        </button>
        <button
          style={algorithm === "selection-sort" ? activeButtonStyle : {}}
          onClick={() => setAlgorithm("selection-sort")}
        >
          SELECTION SORT
        </button>
        <button>LINEAR SEARCH</button>
        <button>BINARY SEARCH</button>
      </div>
      {algorithm === "bubble-sort" && <BubbleSort />}
      {algorithm === "selection-sort" && <SelectionSort />}
    </div>
  );
}

export default Main;
