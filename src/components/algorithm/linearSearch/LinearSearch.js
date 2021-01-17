import React, { useState, useEffect } from "react";
import styles from "./LinearSearch.module.css";
import { getRandomArray } from "../../../utils/randomArray";
import CommonButtons from "../../commonButtons/CommonButtons";
import { delay } from "../../../utils/delay";
function LinearSearch({ algorithm }) {
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
  useEffect(() => {
    setArray(getRandomArray(arraySize));
    return () => setArray([]);
  }, [arraySize]);
  const animate = async (arr, dataSet) => {
    setInactiveCommonButtons(true);
    if (searchInputValue === null) {
      setInactiveCommonButtons(false);
      return;
    }
    for (let i = 0; i < dataSet; i++) {
      await delay(delaySpeed);
      setComparingElementIndex(i);
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
