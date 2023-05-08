import React, { useRef, useState } from 'react';

// Import util
import HandleBack from '../../utils/handleBack';

function Slider({
  media,
  handleScroll,
  sliderTopLevel,
  sliderDiv,
  imageContainer,
  sliderImage,
  back,
  indexIndicator,
  sliderScrollDiv,
}) {
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollImages = (event) => {
    const direction = event.target.value === '→' ? 1 : -1;
    const slider = sliderRef.current;

    if (slider) {
      const imageWidth = slider.clientWidth;
      let newIndex = currentIndex + direction;

      if (newIndex < 0) {
        newIndex = media.length - 1;
      } else if (newIndex >= media.length) {
        newIndex = 0;
      }

      const newPosition = newIndex * imageWidth;
      slider.scrollTo({ left: newPosition, behavior: 'smooth' });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className={sliderTopLevel}>
      <div className={sliderScrollDiv}>
        {media.length > 1 && (
          <>
            <button value="←" onClick={scrollImages}>
              ←
            </button>
            <button value="→" onClick={scrollImages}>
              →
            </button>
          </>
        )}
      </div>
      <div onScroll={handleScroll} ref={sliderRef} className={sliderDiv}>
        {media.map((image, index) => (
          <div key={index} className={imageContainer}>
            <img src={image} alt={`Slide ${index}`} className={sliderImage} />
          </div>
        ))}
      </div>
      <div className={back}>
        <HandleBack />
      </div>
      <div className={indexIndicator}>
        {currentIndex + 1} / {media.length}
      </div>
    </div>
  );
}

export default Slider;
