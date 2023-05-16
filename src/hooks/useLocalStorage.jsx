import { useState, useEffect } from 'react';

function useUserData() {
  const [name, setName] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isVenueManager, setIsVenueManager] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedAccessToken = localStorage.getItem('accessToken');
    setIsVenueManager(localStorage.getItem('venueManager'));

    if (storedName) {
      setName(storedName);
    }

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  return {
    name,
    accessToken,
    isVenueManager,
  };
}

export default useUserData;
