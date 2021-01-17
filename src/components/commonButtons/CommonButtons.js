import React from "react";
import styles from "./CommonButtons.module.css";
function CommonButtons(props) {
  const fadeCommonButtons = {
    pointerEvents: "none",
    opacity: "0.5",
  };
  const handleSmallDataset = () => {
    if (
      props.algorithm === "linear-search" ||
      props.algorithm === "binary-search"
    ) {
      props.setArraySize(6);
    } else {
      props.setArraySize(10);
    }
  };
  const handleLargeDataset = () => {
    if (
      props.algorithm === "linear-search" ||
      props.algorithm === "binary-search"
    ) {
      props.setArraySize(8);
    } else {
      props.setArraySize(20);
    }
  };
  return (
    <div className={styles.buttonContainer}>
      <button
        onClick={() => props.animate(props.array, props.arraySize)}
        style={props.inactiveCommonButtons === true ? fadeCommonButtons : {}}
      >
        ANIMATE
      </button>
      <button
        onClick={() => props.randomize()}
        style={props.inactiveCommonButtons === true ? fadeCommonButtons : {}}
      >
        RANDOMIZE
      </button>
      <input
        type="range"
        name="slider"
        id={styles.rangeSlider}
        min="500"
        max="1500"
        onChange={(e) => props.setDelaySpeed(parseInt(e.target.value))}
        value={props.delaySpeed}
        style={props.inactiveCommonButtons === true ? fadeCommonButtons : {}}
      />
      <button
        onClick={handleSmallDataset}
        style={props.inactiveCommonButtons === true ? fadeCommonButtons : {}}
      >
        SMALL DATASET
      </button>
      <button
        onClick={handleLargeDataset}
        style={props.inactiveCommonButtons === true ? fadeCommonButtons : {}}
      >
        LARGE DATASET
      </button>
    </div>
  );
}

export default CommonButtons;
