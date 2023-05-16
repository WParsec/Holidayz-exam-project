import React from 'react';

// Import styles
import styles from './backSection.module.scss';

// Import util
import HandleBack from '../../utils/handleBack';

function BackSection({ backgroundImage, text }) {
  // Set the background style
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }
    : {};

  return (
    <section className={styles.back_section} style={backgroundStyle}>
      <div className="container">
        <HandleBack text={text} />
      </div>
    </section>
  );
}

export default BackSection;
