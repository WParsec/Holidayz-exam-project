import React from 'react';

import SEO from '../../utils/SEO.jsx';
import { Link } from 'react-router-dom';

// Import styles and assets
import backgroundImage from '../../assets/backgrounds/leaf.jpg';
import styles from './pageNotFound.module.scss';

function PageNotFound() {
  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <SEO
        title={`404 | Holidayz`}
        description={
          'Holidayz 404 page. Not all who wander are lost, but you are. The page you are looking for does not exist.'
        }
      />
      <div className="container">
        <div className={styles.wrap}>
          <h1>404</h1>
          <h2>Not all who wander are lost</h2>
          <p>But you are. The page you are looking for does not exist.</p>
          <Link to={'/'}>← Back to safe shores</Link>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
