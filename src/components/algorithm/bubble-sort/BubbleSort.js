import React, { useState, useEffect } from "react";
import styles from "./BubbleSort.module.css";
import randomArray from "../../../utils/randomArray";
import CommonButtons from "../../common-buttons/CommonButtons";
import { delay } from "../../../utils/delay";
function BubbleSort() {
  const sortingDefinition =
    "Bubble Sort: Every pair of adjacent values is compared, and then the two values swap positions if the first value is greater than the second.";
  let [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(randomArray(arraySize));
  useEffect(() => {
    setArray(randomArray(arraySize));
  }, [arraySize]);
  const [comparingElementsIndex, setComparingElementsIndex] = useState({
    elementOneIndex: null,
    elementTwoIndex: null,
  });
  const [checkSortedBar, setCheckSortedBar] = useState(0);
  const [delaySpeed, setDelaySpeed] = useState(1000);
  const sortWithDelay = async (arr, dataSet) => {
    for (let i = 0; i < dataSet - 1; i++) {
      for (let j = 0; j < dataSet - i - 1; j++) {
        await delay(delaySpeed);
        if (arr[j] > arr[j + 1]) {
          setComparingElementsIndex({
            elementOneIndex: j,
            elementTwoIndex: j + 1,
          });
          setCheckSortedBar(0);
          await delay(delaySpeed);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        } else if (arr[j] <= arr[j + 1]) {
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
  };
  const showBarGraph = (arr) => {
    return arr.map((item, index) => (
      <div
        className={styles.itemWrapper}
        key={index + 1}
        style={{ left: `${(index + 1) * 20}px` }}
      >
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
    setArray(randomArray(arraySize));
    setComparingElementsIndex({ elementOneIndex: null, elementTwoIndex: null });
    setCheckSortedBar(0);
  };

  return (
    <div className={styles.sortContainer}>
      <p>{sortingDefinition}</p>
      <div className={styles.algorithmAnimate}>{showBarGraph(array)}</div>
      <CommonButtons
        sortWithDelay={sortWithDelay}
        randomize={randomize}
        setArraySize={setArraySize}
        array={array}
        arraySize={arraySize}
        setDelaySpeed={setDelaySpeed}
        delaySpeed={delaySpeed}
      />
    </div>
  );
}

export default BubbleSort;
