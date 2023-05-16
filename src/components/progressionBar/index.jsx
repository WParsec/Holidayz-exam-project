import React from 'react';

function ProgressionBar({ progression, styles, setFormProgression }) {
  // Assume you have 3 progression bars
  const bars = [1, 2, 3];
  console.log(progression);

  return (
    <div className={styles.progression_flex}>
      {bars.map((_, index) => (
        <div
          key={index}
          className={`${styles.progression_bar} ${
            index < progression ? styles.filled : ''
          }`}
          onClick={() => {
            setFormProgression(index + 1);
          }}
        />
      ))}
    </div>
  );
}

export default ProgressionBar;
