// hooks/useRegister.js
import { useState } from 'react';

const useRegister = () => {
  const options = (data) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const [loading, setLoading] = useState(false);

  const register = async (data) => {
    setLoading(true);

    try {
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', options(data));
      const results = await response.json();
      console.log(results);

      if (!response.ok) {
        const error = results.errors[0].message;
        throw new Error(error || 'Something went wrong');
      }

      return { success: true, results };

    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

export default useRegister;


