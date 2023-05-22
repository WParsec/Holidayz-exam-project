import { useState } from 'react';

function useDelete(url, accessToken) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteItem = async (id) => {
    setIsDeleting(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(response);
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteItem, isDeleting, isError, errorMessage };
}

export default useDelete;
