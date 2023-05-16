import React from 'react';

// Import styles and assets
import styles from './profileBookings.module.scss';

// Import hooks
import useApi from '../../hooks/useApi';

function ProfileBookings({ url, accessToken }) {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useApi(url + '/bookings' + '?_venue=true', accessToken);
  console.log(bookings);

  // Build two arrays from the bookings array: One for bookings in the future and one for bookings in the past
  const upcomingBookings = [];
  const previousBookings = [];

  bookings.forEach((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);

    if (bookingDate > today) {
      upcomingBookings.push(booking);
    } else {
      previousBookings.push(booking);
    }
  });

  return (
    <div className="container">
      <div className={styles.venues_wrap}>
        <div className={styles.left}>
          <h4 className={styles.h4}>Your previous bookings</h4>
          <div className={styles.bookings}>
            {bookings && bookings.length > 0
              ? previousBookings.map((booking) => (
                  <div className={styles.booking} key={booking.id}>
                    <div className={styles.image_div}>
                      <img
                        src={booking.venue.media[0]}
                        alt={booking.venue.name}
                      />
                    </div>
                    <div className={styles.info}>
                      <h5 className={styles.h5}>{booking.venue.name}</h5>
                      {booking.venue.location.address && (
                        <p>{booking.venue.location.address}</p>
                      )}
                    </div>
                  </div>
                ))
              : ''}
          </div>
        </div>
        <div className={styles.right}>
          <h4 className={styles.h4}>Your upcoming bookings</h4>
          <div className={styles.bookings}>
            {bookings && bookings.length > 0
              ? upcomingBookings.map((booking) => (
                  <div className={styles.booking} key={booking.id}>
                    <div className={styles.image_div}>
                      <img
                        src={booking.venue.media[0]}
                        alt={booking.venue.name}
                      />
                    </div>
                    <div className={styles.info}>
                      <h5 className={styles.h5}>{booking.venue.name}</h5>
                      {booking.venue.location.address && (
                        <p>{booking.venue.location.address}</p>
                      )}
                    </div>
                    <div className={styles.dates}>
                      <p>
                        From: {new Date(booking.dateFrom).toLocaleDateString()}
                      </p>
                      <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBookings;
