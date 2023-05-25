import React, { useEffect, useState } from 'react';

// Import hook
import useApi from '../../hooks/useApi';

// Import url
import { baseUrl } from '../../common/common';

// Import styles and assets
import styles from './yourReservations.module.scss';

function YourReservations({ selectedId }) {
  const [reservations, setReservations] = useState([]);
  const {
    data: venue,
    isLoading,
    isError,
  } = useApi(`${baseUrl}/venues/${selectedId}?_bookings=true`);

  useEffect(() => {
    if (venue) {
      setReservations(venue.bookings);
    }
  }, [venue]);

  if (isLoading) {
    return (
      <div className={styles.reservations_wrap}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.reservations_wrap}>
        <h5>Could not load reservations</h5>
      </div>
    );
  }

  return (
    <>
      <h2>Your Reservations</h2>
      <div className={styles.reservations_wrap}>
        {reservations && reservations.length > 0
          ? reservations.map((reservation) => {
              const { dateFrom, dateTo, guests } = reservation;
              return (
                <div className={styles.reservation} key={reservation.id}>
                  <h5>{venue.name}</h5>
                  <div>
                    <h5>From/To</h5>
                    <p>{new Date(dateFrom).toLocaleDateString()}</p>
                    <p>{new Date(dateTo).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h5>Amount Guests</h5>
                    <p>{guests}</p>
                  </div>
                </div>
              );
            })
          : 'No reservations yet'}
      </div>
    </>
  );
}

export default YourReservations;
