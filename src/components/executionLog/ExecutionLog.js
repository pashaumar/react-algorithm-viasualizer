import React from "react";
import styles from "./ExecutionLog.module.css";
function ExecutionLog({ getExecutionContent, setExecutionContent }) {
  return (
    <div className={styles.executionContainer}>
      <div className={styles.head}>
        <h4>Execution Logs</h4>
        <p onClick={() => setExecutionContent([])}>Clear Logs</p>
      </div>
      <div className={styles.executionContent}>{getExecutionContent()}</div>
    </div>
  );
}

export default ExecutionLog;
