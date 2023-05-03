import React from 'react'

// Import util
import HandleBack from '../../utils/handleBack';

function Slider({ media, currentIndex, handleScroll, sliderTopLevel, sliderDiv, imageContainer, sliderImage, back, indexIndicator }) {
    return (
      <div className={sliderTopLevel}>
          <div onScroll={handleScroll} className={sliderDiv}>
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
    )
  }  

export default Slider;
