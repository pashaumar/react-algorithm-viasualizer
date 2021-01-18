import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className={styles.footer}>
      <Link to="/error">
        <img src={logo} alt="" />
      </Link>
      <p>Visualizer</p>
      <a
        target="_/blank"
        href="https://github.com/pashaumar/react-algorithm-viasualizer"
      >
        <i className="fab fa-github"></i>
      </a>
    </div>
  );
}

export default Footer;
