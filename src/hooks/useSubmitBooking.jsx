import { useState } from 'react';

// Import url
import { bookingsUrl } from '../common/common.jsx';

const useSubmitBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitBooking = async (venueId, dateFrom, dateTo, guests) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('accessToken');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        venueId,
        dateFrom,
        dateTo,
        guests: parseInt(guests),
      }),
    };

    try {
      const response = await fetch(bookingsUrl, options);
      const results = await response.json();

      if (!response.ok) {
        const error = results.errors[0].message;
        throw new Error(error || 'Something went wrong');
      }

      return { success: true, results };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { submitBooking, loading, error };
};

export default useSubmitBooking;
