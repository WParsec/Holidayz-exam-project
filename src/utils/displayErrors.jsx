import React from 'react';

const DisplayError = ({ isBooked, bookingError, uiError, success, styles }) => {
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
        Booking successful! <a href="/">View Bookings</a>
      </p>
    );
  }

  return null;
};

export default DisplayError;
