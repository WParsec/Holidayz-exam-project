import React from 'react';

// Import styles
import styles from './hero.module.scss';

function Hero({ backgroundImage, children }) {
  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}>
      <div className='container'>
        <div className={styles.heroContent}>
          <h1>Accommodation Worldwide</h1>
          <h4>Where to next?</h4>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Hero;
