import React from 'react';

// Import styles
import styles from './hero.module.scss';

function Hero({ backgroundImage }) {
  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
    </div>
  );
}

export default Hero;
