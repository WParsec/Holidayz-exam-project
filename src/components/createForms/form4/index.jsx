import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import URL
import { createVenueUrl } from '../../../common/common';

// Import hook
import usePOST from '../../../hooks/usePOST';
import useUserData from '../../../hooks/useLocalStorage';

function Form4({
  styles,
  name,
  description,
  price,
  media,
  address,
  city,
  country,
  continent,
  handlePrevious,
  capacity,
}) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { postRequest: createVenue } = usePOST();
  const { accessToken } = useUserData();
  const data = {
    name,
    description,
    media,
    price,
    maxGuests: capacity,
    location: {
      address,
      city,
      country,
      continent,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await createVenue(createVenueUrl, data, accessToken);

    if (results.success) {
      setIsSuccess(true);
    } else {
      setIsError(true);
      setErrorMessage(results.error);
    }
  };

  return (
    <div>
      <h1 className={styles.h1}>Verify your data</h1>
      <div className={styles.content_flex}>
        <div className={styles.content_wrap}>
          <div className={styles.verify_div}>
            <h3>Venue</h3>
            <p>{name}</p>
            <p>{description}</p>
            <p>Price/night: {price}</p>
            <p>Max Capacity: {capacity} Persons</p>
            <h3>Location</h3>
            <p>{address}</p>
            <div className={styles.location_wrap}>
              <p>
                {`${city}, `} {`${country}, `} {`${continent}`}
              </p>
            </div>
          </div>
          {isSuccess && (
            <div className={styles.success}>
              <p>Your venue has been published!</p>
              <Link to="/">See venues</Link>
            </div>
          )}
          {isSuccess === false && isError === false && (
            <div className={styles.next_div}>
              <button onClick={handleSubmit} className={`cta cta_gradient`}>
                Publish
              </button>
            </div>
          )}
          {isSuccess === false && isError === false && (
            <button onClick={handlePrevious} className={styles.previous}>
              ← Previous
            </button>
          )}
          {isError && (
            <div className={styles.error}>
              <p>{errorMessage}</p>
              <button onClick={handlePrevious} className={styles.previous}>
                ← Back
              </button>
            </div>
          )}
        </div>
        <div className={styles.preview_div}>
          {media &&
            media.map((image, index) => (
              <div key={index} className={styles.preview_image_div}>
                <img src={image} alt="preview" className={styles.preview_img} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Form4;
