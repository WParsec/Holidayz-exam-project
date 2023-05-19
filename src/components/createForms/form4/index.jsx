import React from 'react';

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
          <div className={styles.next_div}>
            <button className="cta cta_gradient">Publish</button>
          </div>
          <button onClick={handlePrevious} className={styles.previous}>
            ← Previous
          </button>
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
