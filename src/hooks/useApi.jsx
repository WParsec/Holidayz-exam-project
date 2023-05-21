import { useState, useEffect } from 'react';

function useApi(url, accessToken = null) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getData() {
      if (!url) return;
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        const headers = accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {};

        const response = await fetch(url, { headers });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}, status text: ${json.errors[0].message}`
          );
        }

        setData(json);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, accessToken]);

  return { data, isLoading, isError, errorMessage };
}

export default useApi;
