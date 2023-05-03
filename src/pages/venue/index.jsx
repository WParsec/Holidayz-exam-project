import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import components
import BackSectionVenue from '../../components/backSectionVenue/index.jsx';
import Slider from '../../components/venueSlider/index.jsx';

// Import styles and assets
import styles from './venue.module.scss';

// Import hooks
import useApi from '../../hooks/useApi';

// Import util
import HandleBack from '../../utils/handleBack';


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
        </div>
        <div className={styles.right_side}></div>
      </div>
    </main>
  );
}

export default Venue;

