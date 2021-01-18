import React, { useState, useEffect } from "react";
import styles from "./SelectionSort.module.css";
import { getRandomArray, getExecutionLogs } from "../../../utils/randomArray";
import CommonButtons from "../../commonButtons/CommonButtons";
import { delay } from "../../../utils/delay";
function SelectionSort({ algorithm, executionContent, setExecutionContent }) {
  const sortingDefinition =
    "Selection Sort: Loop through the input array linearly, selecting the first smallest element, and then swap it to the first position. Then you loop through the array again using a linear scan and get the second smallest element, swap it to the second position, and so on and so forth until your array is completely sorted.";
  let [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(getRandomArray(arraySize));

  const [comparingElementsIndex, setComparingElementsIndex] = useState({
    elementOneIndex: null,
    elementTwoIndex: null,
  });
  const [inactiveCommonButtons, setInactiveCommonButtons] = useState(false);
  const [delaySpeed, setDelaySpeed] = useState(1000);
  const [min, setMin] = useState(null);
  const [executionLogMessage, setExecutionLogMessage] = useState("");
  useEffect(() => {
    setArray(getRandomArray(arraySize));
    if (arraySize === 10) {
      setExecutionContent([
        ...executionContent,
        getExecutionLogs(algorithm, "Dataset changed to small"),
      ]);
    } else if (arraySize === 20) {
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
    setExecutionLogMessage("Visualization started");
    setInactiveCommonButtons(true);
    for (let i = 0; i < dataSet; i++) {
      let min = i;
      await delay(delaySpeed);
      setMin(min);
      setComparingElementsIndex({
        elementOneIndex: min,
        elementTwoIndex: null,
      });
      setExecutionLogMessage(`setting min to ${arr[min]}`);
      await delay(delaySpeed);
      for (let j = i + 1; j < dataSet; j++) {
        setComparingElementsIndex({
          elementOneIndex: min,
          elementTwoIndex: j,
        });
        setExecutionLogMessage(`comparing ${arr[min]} and ${arr[j]}`);
        await delay(delaySpeed);
        if (arr[min] > arr[j]) {
          await delay(delaySpeed);
          min = j;
          setMin(min);
          setExecutionLogMessage(`changing min to ${arr[min]}`);
          await delay(delaySpeed);
        }
      }
      setComparingElementsIndex({ elementOneIndex: min, elementTwoIndex: i });
      await delay(delaySpeed);
      setExecutionLogMessage(`swapping ${arr[i]} and ${arr[min]}`);
      [arr[min], arr[i]] = [arr[i], arr[min]];
      setArray([...arr]);
    }
    setComparingElementsIndex({ elementOneIndex: null, elementTwoIndex: null });
    setMin(null);
    setInactiveCommonButtons(false);
    setExecutionLogMessage("sorted");
  };
  const showBarGraph = (arr) => {
    return arr.map((item, index) => (
      <div className={styles.itemWrapper} key={index + 1}>
        <div
          style={{
            backgroundColor: `${
              comparingElementsIndex.elementOneIndex === index ||
              comparingElementsIndex.elementTwoIndex === index
                ? "rgba(238, 82, 83,1.0)"
                : "rgba(56, 173, 169, 1)"
            } `,
            height: `${item * 5}px`,
            width: "15px",
          }}
        ></div>
        <p>{item}</p>
        {min === index && (
          <div className={styles.min}>
            min
            <div></div>
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
    setComparingElementsIndex({ elementOneIndex: null, elementTwoIndex: null });
  };
  return (
    <div className={styles.sortContainer}>
      <p>{sortingDefinition}</p>
      <div className={styles.algorithmAnimate}>{showBarGraph(array)}</div>
      <CommonButtons
        animate={animate}
        randomize={randomize}
        setArraySize={setArraySize}
        array={array}
        arraySize={arraySize}
        setDelaySpeed={setDelaySpeed}
        delaySpeed={delaySpeed}
        inactiveCommonButtons={inactiveCommonButtons}
      />
    </div>
  );
}

export default SelectionSort;
