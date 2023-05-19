import React from 'react';

function ProgressionBar({ progression, styles }) {
  const totalBars = 4;
  const progressBarPercentage = (progression / totalBars) * 100;

  return (
    <div className={styles.progression_bar}>
      <div
        className={styles.progress_fill}
        style={{ width: `${progressBarPercentage}%` }}
      />
    </div>
  );
}

export default ProgressionBar;
