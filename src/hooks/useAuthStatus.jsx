// hooks/useAuthStatus.js
import { useState, useEffect } from 'react';

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, logout };
};

export default useAuthStatus;
