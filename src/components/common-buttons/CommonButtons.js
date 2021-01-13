import React, { useEffect } from "react";
import styles from "./CommonButtons.module.css";
function CommonButtons(props) {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={() => props.sortWithDelay(props.array, props.arraySize)}>
        ANIMATE
      </button>
      <button onClick={() => props.randomize()}>RANDOMIZE</button>
      <input
        type="range"
        name="slider"
        id={styles.rangeSlider}
        min="500"
        max="1500"
        onChange={(e) => props.setDelaySpeed(parseInt(e.target.value))}
        value={props.delaySpeed}
      />
      <button onClick={() => props.setArraySize(10)}>SMALL DATASET</button>
      <button onClick={() => props.setArraySize(20)}>LARGE DATASET</button>
    </div>
  );
}

export default CommonButtons;
