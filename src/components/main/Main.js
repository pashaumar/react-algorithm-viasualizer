import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import BubbleSort from "../algorithm/bubbleSort/BubbleSort";
import SelectionSort from "../algorithm/selectionSort/SelectionSort";
import LinearSearch from "../algorithm/linearSearch/LinearSearch";
import BinarySearch from "../algorithm/binarySearch/BinarySearch";
import ExecutionLog from "../executionLog/ExecutionLog";
function Main() {
  const [algorithm, setAlgorithm] = useState("bubble-sort");
  const [executionContent, setExecutionContent] = useState([]);
  const activeButtonStyle = {
    color: "white",
    backgroundColor: "rgba(238, 82, 83,1.0)",
    border: "none",
  };
  useEffect(() => {
    setExecutionContent([
      ...executionContent,
      {
        algorithm: algorithm,
        time: ` ${
          new Date().getHours() > 12
            ? `${new Date().getHours() - 12}`
            : new Date().getHours()
        }:${new Date().getMinutes()}:${
          new Date().getSeconds() < 10
            ? `0${new Date().getSeconds()}`
            : new Date().getSeconds()
        }`,
        message: ` ${algorithm} mounted`,
      },
    ]);
  }, [algorithm]);
  const getExecutionContent = () => {
    const date = new Date();
    return executionContent.map((item, index) => (
      <p key={index + 1}>
        @{item.algorithm}:<span className={styles.time}>{item.time}</span>
        <span className={styles.message}>{item.message}</span>
      </p>
    ));
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
        <button
          style={algorithm === "linear-search" ? activeButtonStyle : {}}
          onClick={() => setAlgorithm("linear-search")}
        >
          LINEAR SEARCH
        </button>
        <button
          style={algorithm === "binary-search" ? activeButtonStyle : {}}
          onClick={() => setAlgorithm("binary-search")}
        >
          BINARY SEARCH
        </button>
      </div>
      {algorithm === "bubble-sort" && (
        <BubbleSort
          algorithm={algorithm}
          executionContent={executionContent}
          setExecutionContent={setExecutionContent}
        />
      )}
      {algorithm === "selection-sort" && (
        <SelectionSort
          algorithm={algorithm}
          executionContent={executionContent}
          setExecutionContent={setExecutionContent}
        />
      )}
      {algorithm === "linear-search" && (
        <LinearSearch
          algorithm={algorithm}
          executionContent={executionContent}
          setExecutionContent={setExecutionContent}
        />
      )}
      {algorithm === "binary-search" && (
        <BinarySearch
          algorithm={algorithm}
          executionContent={executionContent}
          setExecutionContent={setExecutionContent}
        />
      )}
      <ExecutionLog
        getExecutionContent={getExecutionContent}
        setExecutionContent={setExecutionContent}
      />
    </div>
  );
}

export default Main;
