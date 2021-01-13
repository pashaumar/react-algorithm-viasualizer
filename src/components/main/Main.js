import React, { useState } from "react";
import styles from "./Main.module.css";
import BubbleSort from "../algorithm/bubble-sort/BubbleSort";
function Main() {
  const [algorithm, setAlgorithm] = useState("bubble-sort");
  return (
    <div className={styles.main}>
      <h4>Select Algorithm here</h4>
      <div className={styles.buttons}>
        <button>BUBBLE SORT</button>
        <button>SELECTION SORT</button>
        <button>LINEAR SEARCH</button>
        <button>BINARY SEARCH</button>
      </div>
      {algorithm === "bubble-sort" && <BubbleSort />}
    </div>
  );
}

export default Main;
