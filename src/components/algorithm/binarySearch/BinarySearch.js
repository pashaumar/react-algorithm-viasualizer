import React, { useState, useEffect } from "react";
import styles from "./BinarySearch.module.css";
import { getRandomArray, getExecutionLogs } from "../../../utils/randomArray";
import CommonButtons from "../../commonButtons/CommonButtons";
import { delay } from "../../../utils/delay";
const getSortedArray = (size) => {
  const randomArray = getRandomArray(size);
  return randomArray.sort((a, b) => a - b);
};
function LinearSearch({ algorithm, executionContent, setExecutionContent }) {
  const LinearSearchDefinition =
    "Binary Search: A binary search takes in a sorted array and looks for a specific element. If the element is present in the array, the search returns the index of the element; otherwise it returns null.";
  const [arraySize, setArraySize] = useState(6);
  const [array, setArray] = useState(getSortedArray(arraySize));
  const [delaySpeed, setDelaySpeed] = useState(1000);
  const [inactiveCommonButtons, setInactiveCommonButtons] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState(null);
  const [comparingIndex, setComparingIndex] = useState({
    low: null,
    mid: null,
    high: null,
  });
  const [searchElementColor, setSearchElementColor] = useState({
    backgroundColor: "rgba(238, 82, 83,1.0)",
  });
  const [
    comparingElementIndexPointerColor,
    setComparingElementIndexPointerColor,
  ] = useState({
    borderBottom: "10px solid rgba(238, 82, 83,1.0)",
  });
  const [executionLogMessage, setExecutionLogMessage] = useState("");
  useEffect(() => {
    setArray(getSortedArray(arraySize));
    if (arraySize === 6) {
      setExecutionContent([
        ...executionContent,
        getExecutionLogs(algorithm, "Dataset changed to small"),
      ]);
    } else if (arraySize === 8) {
      setExecutionContent([
        ...executionContent,
        getExecutionLogs(algorithm, "Dataset changed to large"),
      ]);
    }
    return () => setArray([]);
  }, [arraySize]);
  useEffect(() => {
    setExecutionContent([
      ...executionContent,
      getExecutionLogs(algorithm, executionLogMessage),
    ]);
  }, [executionLogMessage]);
  const animate = async (arr, dataSet) => {
    setExecutionLogMessage(`Visualization started`);
    setInactiveCommonButtons(true);
    if (searchInputValue === null) {
      setInactiveCommonButtons(false);
      return;
    }
    let low = 0;
    let high = dataSet - 1;
    while (low <= high) {
      await delay(delaySpeed);
      const mid = Math.floor((low + high) / 2);
      setComparingIndex({ low: low, mid: mid, high: high });
      setExecutionLogMessage(`low index is ${low}`);
      setExecutionLogMessage(`mid index is ${mid}`);
      setExecutionLogMessage(`high index is ${high}`);
      if (arr[mid] === searchInputValue) {
        await delay(delaySpeed);
        setExecutionLogMessage(`found at ${mid} index`);
        setSearchElementColor({ backgroundColor: "rgba(39, 174, 96,1.0)" });
        setComparingElementIndexPointerColor({
          borderBottom: "10px solid rgba(39, 174, 96,1.0)",
        });
        setComparingIndex({ low: null, mid: mid, high: null });
        await delay(delaySpeed);
        setSearchElementColor({ backgroundColor: "rgba(238, 82, 83,1.0)" });
        setComparingElementIndexPointerColor({
          borderBottom: "10px solid rgba(238, 82, 83,1.0)",
        });
        setInactiveCommonButtons(false);
        setComparingIndex({ low: null, mid: null, high: null });
        return;
      } else if (searchInputValue < arr[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    setExecutionLogMessage("not found");
    setInactiveCommonButtons(false);
    setComparingIndex({ low: null, mid: null, high: null });
    setSearchElementColor({ backgroundColor: "rgba(238, 82, 83,1.0)" });
    setComparingElementIndexPointerColor({
      borderBottom: "10px solid rgba(238, 82, 83,1.0)",
    });
  };
  const showBarGraph = (arr) => {
    return arr.map((item, index) => (
      <div className={styles.itemContainer} key={index + 1}>
        {item}
        {comparingIndex.low === index && (
          <div
            style={{ backgroundColor: "black", color: "white" }}
            className={styles.lowIndex}
          >
            low?
            <div
              className={styles.pointer}
              style={{ borderBottom: "10px solid black" }}
            ></div>
          </div>
        )}
        {comparingIndex.mid === index && (
          <div style={searchElementColor} className={styles.searchElement}>
            {searchInputValue}?
            <div
              className={styles.pointer}
              style={comparingElementIndexPointerColor}
            ></div>
          </div>
        )}
        {comparingIndex.high === index && (
          <div
            style={{ backgroundColor: "black", color: "white" }}
            className={styles.highIndex}
          >
            high?
            <div
              className={styles.pointer}
              style={{ borderBottom: "10px solid black" }}
            ></div>
          </div>
        )}
      </div>
    ));
  };
  const randomize = () => {
    setExecutionContent([
      ...executionContent,
      getExecutionLogs(algorithm, "Dataset randomized"),
    ]);
    setArray(getSortedArray(arraySize));
  };
  return (
    <div className={styles.searchContainer}>
      <p>{LinearSearchDefinition}</p>
      <input
        type="number"
        name="number"
        id={styles.searchInput}
        placeholder="search-element"
        onChange={(e) => setSearchInputValue(parseInt(e.target.value))}
      />
      <div className={styles.searchAnimate}>{showBarGraph(array)}</div>
      <CommonButtons
        animate={animate}
        randomize={randomize}
        setArraySize={setArraySize}
        array={array}
        arraySize={arraySize}
        setDelaySpeed={setDelaySpeed}
        delaySpeed={delaySpeed}
        inactiveCommonButtons={inactiveCommonButtons}
        algorithm={algorithm}
      />
    </div>
  );
}
export default LinearSearch;
