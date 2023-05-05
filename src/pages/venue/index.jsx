import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import components
import BackSectionVenue from '../../components/backSectionVenue/index.jsx';
import Slider from '../../components/venueSlider/index.jsx';

// Import styles and assets
import styles from './venue.module.scss';
import star from '../../assets/icons/star.svg';
import pin from '../../assets/icons/location_pin.svg';
import placeholderAvatar from '../../assets/placeholder_avatar.jpg';

// Import hooks
import useApi from '../../hooks/useApi';


function Venue() {
  const { id } = useParams();
  const { data: venue, error, loading } = useApi(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`);
  const [currentIndex, setCurrentIndex] = useState(0);


  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  // Destructure the venue object
  const { description, location, maxGuests, media, meta, name, owner, price, rating } = venue;
  console.log(venue);

  // GPT function to handle scroll index
  const handleScroll = (e) => {
    const slider = e.target;
    let closestIndex = 0;
    let minDistance = Number.MAX_VALUE;
  
    // Loop through the children of the slider (image containers)
    for (let i = 0; i < slider.children.length; i++) {
      const child = slider.children[i];
      const distance = Math.abs(child.offsetLeft - slider.scrollLeft);
  
      // Find the child with the smallest distance to the left edge of the slider
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
  
    // Update the index if it has changed
    if (closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
    }
  };
  

  return (
    <main>
      <BackSectionVenue />
      <div className={styles.top_flex}>
        <div className={styles.left_side}>
          {media && (
            <Slider
              media={media}
              currentIndex={currentIndex}
              handleScroll={handleScroll}
              sliderTopLevel={styles.slider_top_level}
              sliderDiv={styles.slider_div}
              imageContainer={styles.image_container}
              sliderImage={styles.slider_image}
              back={styles.back}
              indexIndicator={styles.index_indicator}
            />
          )}
          <div className={styles.owner_div}>
            {owner ? (
              <>
                <div className={styles.avatar_div}>
                  {owner.avatar !== null ? (
                    <img src={owner.avatar} alt="avatar" className={styles.avatar} />
                  ) : (
                    <img src={placeholderAvatar} alt="avatar" className={styles.avatar} />
                  )}
                </div>
                <div>
                  <h4>{owner.name}</h4>
                  <p className={styles.member_since}>Member since 2023</p>
                </div>
              </>
            ) : (
              <p>Loading owner...</p>
            )}
          </div>
        </div>
        <div className={styles.right_side}>
          <div className={styles.right_side_top}>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.rating}>
              <p className={styles.rating_text}>Rating: {rating} <img src={star} alt="star"/></p>
            </div>
          </div>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
          <div className={styles.meta}>
            {meta && Object.entries(meta).map(([key, value]) => {
              if (value) {
                return <h4 key={key}>{key}</h4>;
              }
              return null;
            })}
          </div>
          <div className={styles.maxGuests}><h4>Max guests: {maxGuests}</h4></div>
          <div className={styles.location}>
            {location && (
              <h4>{location.city}, {location.country} <img src={pin} alt=""/></h4>
            )}
          </div>
          <div className={styles.price}>
            <h4>Price: {price} NOK <span>/ night</span></h4>
          </div>
        </div>
      </div>
      <div className={styles.venue_bottom}>
        <div className='container'>
          <div className={styles.venue_bottom_flex}>
            <div className={styles.bottom_left}></div>
            <div className={styles.bottom_right}></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Venue;

