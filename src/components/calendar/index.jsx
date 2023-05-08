import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

// Import styles
import styles from './calendar.module.scss';
import './customCalendar.scss';

const VenueCalendar = ({ bookings }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const bookedDates = [];

    bookings.forEach((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      let current = start;

      while (current <= end) {
        bookedDates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });

    setDates(bookedDates);
  }, [bookings]);

  return (
    <div>
      <Calendar
        tileClassName={({ date }) =>
          dates.some(
            (bookedDate) =>
              bookedDate.getFullYear() === date.getFullYear() &&
              bookedDate.getMonth() === date.getMonth() &&
              bookedDate.getDate() === date.getDate()
          )
            ? styles.booked
            : ''
        }
      />
    </div>
  );
};

export default VenueCalendar;
