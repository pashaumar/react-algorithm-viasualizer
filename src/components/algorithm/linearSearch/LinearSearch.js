import React, { useState, useEffect } from "react";
import styles from "./LinearSearch.module.css";
import { getRandomArray, getExecutionLogs } from "../../../utils/randomArray";
import CommonButtons from "../../commonButtons/CommonButtons";
import { delay } from "../../../utils/delay";
function LinearSearch({ algorithm, executionContent, setExecutionContent }) {
  const LinearSearchDefinition =
    "Linear Search: Loop through each element of the array and return the match.";
  const [arraySize, setArraySize] = useState(6);
  const [array, setArray] = useState(getRandomArray(arraySize));
  const [delaySpeed, setDelaySpeed] = useState(1000);
  const [inactiveCommonButtons, setInactiveCommonButtons] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState(null);
  const [comparingElementIndex, setComparingElementIndex] = useState(null);
  const [comparingElementIndexColor, setComparingElementIndexColor] = useState({
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
    setArray(getRandomArray(arraySize));
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
    setInactiveCommonButtons(true);
    if (searchInputValue === null) {
      setInactiveCommonButtons(false);
      return;
    }
    setExecutionLogMessage("Visualization started");
    for (let i = 0; i < dataSet; i++) {
      await delay(delaySpeed);
      setComparingElementIndex(i);
      setExecutionLogMessage(`is ${searchInputValue} equals to ${arr[i]}?`);
      if (arr[i] === searchInputValue) {
        setComparingElementIndexColor({
          backgroundColor: "rgba(39, 174, 96,1.0)",
        });
        setComparingElementIndexPointerColor({
          borderBottom: "10px solid rgba(39, 174, 96,1.0)",
        });
        setInactiveCommonButtons(false);
        await delay(delaySpeed);
        setComparingElementIndex(null);
        setExecutionLogMessage(`found at ${i} index`);
        return;
      }
      setComparingElementIndexColor({
        backgroundColor: "rgba(238, 82, 83,1.0)",
      });
      setComparingElementIndexPointerColor({
        borderBottom: "10px solid rgba(238, 82, 83,1.0)",
      });
    }
    await delay(delaySpeed);
    setExecutionLogMessage("not found");
    setInactiveCommonButtons(false);
    setComparingElementIndex(null);
  };
  const showBarGraph = (arr) => {
    return arr.map((item, index) => (
      <div className={styles.itemContainer} key={index + 1}>
        {item}
        {comparingElementIndex === index && (
          <div
            style={comparingElementIndexColor}
            className={styles.searchElement}
          >
            {searchInputValue}?
            <div
              className={styles.pointer}
              style={comparingElementIndexPointerColor}
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
    setArray(getRandomArray(arraySize));
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
