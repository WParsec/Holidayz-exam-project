// hooks/useLogin.js
import { useState } from 'react';

// Import url
import { loginUrl } from '../common/common';

const useLogin = () => {
  const [loginError, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    setError(null);

    const options = (data) => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    try {
      const response = await fetch(loginUrl, options(data));
      const results = await response.json();
      console.log(results);

      if (!response.ok) {
        const error = results.errors[0].message;
        throw new Error(error || 'Something went wrong');
      }

      // Save token to local storage and redirect to home page
      localStorage.setItem('accessToken', results.accessToken);
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginError, loading, login };
};

export default useLogin;
