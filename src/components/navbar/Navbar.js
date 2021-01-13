import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
function Navbar() {
  return (
    <div className={styles.nav}>
      <img src={logo} alt="" />
      <p>Visualizer</p>
    </div>
  );
}

export default Navbar;
