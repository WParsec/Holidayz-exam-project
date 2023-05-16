import React from 'react';

function Form1({
  styles,
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  media,
  setMedia,
}) {
  return (
    <div className="container">
      <h1 className={styles.h1}>Register Your Venue</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Name of Venue <span>*</span>
          </label>
          <input
            placeholder="Lovely Beach House"
            id="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="price" className={styles.label}>
            Price Per Night <span>*</span>
          </label>
          <input
            id="price"
            type="number"
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>
            Description <span>*</span>
          </label>
          <textarea
            placeholder="A beautiful beach house with a view of the ocean."
            id="description"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default Form1;
