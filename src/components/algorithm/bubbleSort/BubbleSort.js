import React, { useState, useEffect } from "react";
import styles from "./BubbleSort.module.css";
import { getRandomArray, getExecutionLogs } from "../../../utils/randomArray";
import CommonButtons from "../../commonButtons/CommonButtons";
import { delay } from "../../../utils/delay";
function BubbleSort({ algorithm, executionContent, setExecutionContent }) {
  const sortingDefinition =
    "Bubble Sort: Every pair of adjacent values is compared, and then the two values swap positions if the first value is greater than the second.";
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(getRandomArray(arraySize));
  const [comparingElementsIndex, setComparingElementsIndex] = useState({
    elementOneIndex: null,
    elementTwoIndex: null,
  });
  const [checkSortedBar, setCheckSortedBar] = useState(0);
  const [delaySpeed, setDelaySpeed] = useState(1000);
  const [inactiveCommonButtons, setInactiveCommonButtons] = useState(false);
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
    for (let i = 0; i < dataSet - 1; i++) {
      for (let j = 0; j < dataSet - i - 1; j++) {
        await delay(delaySpeed);

        if (arr[j] > arr[j + 1]) {
          setComparingElementsIndex({
            elementOneIndex: j,
            elementTwoIndex: j + 1,
          });
          setExecutionLogMessage(`comparing ${arr[j]} and ${arr[j + 1]}`);
          setCheckSortedBar(0);
          await delay(delaySpeed);
          setExecutionLogMessage(`swapping ${arr[j]} and ${arr[j + 1]}`);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        } else if (arr[j] <= arr[j + 1]) {
          setExecutionLogMessage(`comparing ${arr[j]} and ${arr[j + 1]} `);
          setComparingElementsIndex({
            elementOneIndex: j,
            elementTwoIndex: j + 1,
          });
          setCheckSortedBar(1);
        }
        setArray([...arr]);
      }
    }
    setComparingElementsIndex({ elementOneIndex: null, elementTwoIndex: null });
    setCheckSortedBar(0);
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
                ? `${
                    checkSortedBar === 0
                      ? "rgba(238, 82, 83,1.0)"
                      : "rgba(39, 174, 96,1.0)"
                  }`
                : "rgba(56, 173, 169, 1)"
            } `,
            height: `${item * 5}px`,
            width: "15px",
          }}
        ></div>
        <p>{item}</p>
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
    setCheckSortedBar(0);
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

export default BubbleSort;
