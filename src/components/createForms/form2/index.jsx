import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

// Schema
const mediaSchema = yup
  .string()
  .url('Please enter a valid URL')
  .min(8, 'I have never seen a URL that short')
  .required('Please enter a URL');

function Form2({
  styles,
  media,
  setMedia,
  setFormProgression,
  handlePrevious,
  title,
}) {
  const [oneMedia, setOneMedia] = useState('');
  const [mediaError, setMediaError] = useState(null);

  useEffect(() => {
    setMedia(media);
  }, [media, setMedia]);

  const handleAddMedia = async (e) => {
    e.preventDefault();
    try {
      await mediaSchema.validate(oneMedia);
      setMedia([...media, oneMedia]);
      setOneMedia('');
      setMediaError(null);
    } catch (error) {
      setMediaError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (media.length === 0) {
      setMediaError('Please add at least one image');
      return;
    }
    setFormProgression(3);
  };

  const handleDeleteMedia = (e, index) => {
    e.preventDefault();
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  return (
    <div>
      <h1 className={styles.h1}>{title}</h1>
      <div className={styles.content_flex}>
        <div className={styles.content_wrap}>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.inputGroup}>
              <label htmlFor="media" className={styles.label}>
                Url to image of your venue <span>*</span>
              </label>
              <div className={styles.inputMedia_div}>
                <input
                  placeholder="www.unsplash.com/house"
                  id="media"
                  className={styles.input}
                  value={oneMedia}
                  onChange={(e) => setOneMedia(e.target.value)}
                />
                <button onClick={(e) => handleAddMedia(e)} className="cta">
                  Add
                </button>
              </div>
              {mediaError && <p className={styles.error}>{mediaError}</p>}
            </div>
            <div className={styles.next_div}>
              <button type="submit" className="cta cta_gradient">
                Next
              </button>
            </div>
          </form>
          <button onClick={handlePrevious} className={styles.previous}>
            ← Previous
          </button>
        </div>
        <div className={styles.preview_div}>
          {media && (
            <p className={styles.preview_p}>
              The top image will display as your main image
            </p>
          )}
          {media &&
            media.map((image, index) => (
              <div key={index} className={styles.preview_image_div}>
                <img src={image} alt="preview" className={styles.preview_img} />
                <div className={styles.delete_div}>
                  <button
                    onClick={(e) => handleDeleteMedia(e, index)}
                    className="cta"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Form2;
