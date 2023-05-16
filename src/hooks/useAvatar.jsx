import { useState } from 'react';

// Import url
import { profileUrl } from '../common/common.jsx';

const useAvatar = (name, accessToken) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateAvatar = async (avatarUrl) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(profileUrl + name + '/media', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors[0].message);
      }

      const data = await response.json();
      console.log(data);
      setResponse(data);
      return data;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return { updateAvatar, isLoading, isError, errorMessage };
};

export default useAvatar;
