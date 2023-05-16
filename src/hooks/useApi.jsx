import { useState, useEffect } from 'react';

function useApi(url, accessToken = null) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const headers = accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {};

        const response = await fetch(url, { headers });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || 'Something went wrong');
        }

        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, accessToken]);

  return { data, isLoading, isError };
}

export default useApi;
