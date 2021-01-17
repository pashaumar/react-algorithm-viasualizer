import React, { useState, useEffect } from "react";
import styles from "./SelectionSort.module.css";
import { getRandomArray } from "../../../utils/randomArray";
import CommonButtons from "../../commonButtons/CommonButtons";
import { delay } from "../../../utils/delay";
function SelectionSort() {
  const sortingDefinition =
    "Selection Sort: Loop through the input array linearly, selecting the first smallest element, and then swap it to the first position. Then you loop through the array again using a linear scan and get the second smallest element, swap it to the second position, and so on and so forth until your array is completely sorted.";
  let [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(getRandomArray(arraySize));
  useEffect(() => {
    setArray(getRandomArray(arraySize));
    return () => setArray([]);
  }, [arraySize]);
  const [comparingElementsIndex, setComparingElementsIndex] = useState({
    elementOneIndex: null,
    elementTwoIndex: null,
  });
  const [inactiveCommonButtons, setInactiveCommonButtons] = useState(false);
  const [delaySpeed, setDelaySpeed] = useState(1000);
  const [min, setMin] = useState(null);
  const animate = async (arr, dataSet) => {
    setInactiveCommonButtons(true);
    for (let i = 0; i < dataSet; i++) {
      await delay(delaySpeed);
      let min = i;
      await delay(delaySpeed);
      setMin(min);
      for (let j = i + 1; j < dataSet; j++) {
        setComparingElementsIndex({
          elementOneIndex: min,
          elementTwoIndex: j,
        });
        await delay(delaySpeed);
        if (arr[min] > arr[j]) {
          await delay(delaySpeed);
          min = j;
          setMin(min);
        }
      }
      setComparingElementsIndex({ elementOneIndex: min, elementTwoIndex: i });
      await delay(delaySpeed);
      [arr[min], arr[i]] = [arr[i], arr[min]];
      setArray([...arr]);
    }
    setComparingElementsIndex({ elementOneIndex: null, elementTwoIndex: null });
    setMin(null);
    setInactiveCommonButtons(false);
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
