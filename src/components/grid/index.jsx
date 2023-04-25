import React from 'react';
import { Link } from 'react-router-dom';

// Import styles
import styles from './grid.module.scss';

function Grid({ venues }) {
  console.log(venues);
  
  return (
    <section>
      <div className='container'>
        <div className={styles.grid}>
          {venues.map((venue) => {
            const { id, name, media } = venue;
            return (
              <Link key={id} to={`/venue/${id}`} className={styles.venueCard}>
                <div className={styles.imageWrapper}>
                  <img src={media[0]} alt={`${name} thumbnail`} />
                </div>
                <div className={styles.venueInfo}>
                  <p>{name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Grid;

  
