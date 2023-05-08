import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// Import styles and assets
import styles from './grid.module.scss';
import star from '../../assets/icons/star.svg';

const Grid = forwardRef(({ venues }, ref) => {
  console.log(venues);

  return (
    <section ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {venues.map((venue) => {
            const { id, name, media, rating, price, location } = venue;
            return (
              <Link key={id} to={`/venue/${id}`} className={styles.venueCard}>
                <div className={styles.imageWrapper}>
                  <img src={media[0]} alt={`${name} thumbnail`} />
                </div>
                <div className={styles.venueInfo}>
                  <h5>
                    {location.city}, {location.country}
                  </h5>
                  <p>
                    {rating} <img src={star} alt="star" />
                  </p>
                </div>
                <div>
                  <p className={styles.price}>${price}/night</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Grid;
