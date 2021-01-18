import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className={styles.nav}>
      <Link to="/error">
        <img src={logo} alt="" />
      </Link>
      <Link to="/">
        <p>Visualizer</p>
      </Link>
    </div>
  );
}

export default Navbar;
