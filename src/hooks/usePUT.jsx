import { useState } from 'react';

function usePut() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateItem = async (url, accessToken, updateData) => {
    setIsUpdating(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateItem, isUpdating, isError, errorMessage };
}

export default usePut;
