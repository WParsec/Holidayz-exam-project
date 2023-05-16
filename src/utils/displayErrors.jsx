import React from 'react';
import { Link } from 'react-router-dom';

// Import hooks
import useLocalStorage from '../hooks/useLocalStorage';

const DisplayError = ({ isBooked, bookingError, uiError, success, styles }) => {
  const { name } = useLocalStorage();

  if (isBooked) {
    return (
      <p className={styles.is_booked}>
        One or more of the selected days are already booked
      </p>
    );
  } else if (bookingError) {
    return <p className={styles.booking_error}>{bookingError}</p>;
  } else if (uiError) {
    return <p className={styles.booking_error}>{uiError}</p>;
  } else if (success) {
    return (
      <p className={styles.success}>
        Booking successful!{' '}
        <Link to={`/profiles/${name}`}>View your bookings</Link>
      </p>
    );
  }

  return null;
};

export default DisplayError;
