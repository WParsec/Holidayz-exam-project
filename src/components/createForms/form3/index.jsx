import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  continent: yup
    .string()
    .required('Please enter a valid continent')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Special characters are not allowed'),
  country: yup
    .string()
    .min(3)
    .required('Please enter a valid country')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Special characters are not allowed'),
  city: yup
    .string()
    .min(2)
    .required('Please enter a valid city')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Special characters are not allowed'),
  address: yup
    .string()
    .min(2)
    .required('Please enter a valid address')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Special characters are not allowed'),
});

function Form3({
  styles,
  continent,
  setContinent,
  country,
  setCountry,
  city,
  setCity,
  address,
  setAddress,
  formProgression,
  setFormProgression,
  handlePrevious,
  title,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      continent: continent,
      country: country,
      city: city,
      address: address,
    },
  });

  useEffect(() => {
    setValue('continent', continent);
    setValue('country', country);
    setValue('city', city);
    setValue('address', address);
  }, [continent, country, city, address, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    setContinent(data.continent);
    setCountry(data.country);
    setCity(data.city);
    setAddress(data.address);
    setFormProgression(formProgression + 1);
  };

  return (
    <div>
      <h1 className={styles.h1}>{title}</h1>
      <div className={styles.content_wrap}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label htmlFor="continent" className={styles.label}>
              Continent <span>*</span>
            </label>
            <select
              id="continent"
              className={styles.input}
              required
              {...register('continent')}
            >
              <option value="">Select...</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Australia">Australia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
            </select>
            {errors && errors.continent && (
              <p className={styles.error}>{errors.continent.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="country" className={styles.label}>
              Country <span>*</span>
            </label>
            <input
              placeholder="Norway"
              id="country"
              type="text"
              className={styles.input}
              required
              {...register('country')}
            />
            {errors && errors.country && (
              <p className={styles.error}>{errors.country.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="city" className={styles.label}>
              City <span>*</span>
            </label>
            <input
              placeholder="Bergen"
              id="city"
              type="text"
              className={styles.input}
              required
              {...register('city')}
            />
            {errors && errors.city && (
              <p className={styles.error}>{errors.city.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="Address" className={styles.label}>
              Address <span>*</span>
            </label>
            <input
              placeholder="Havnegaten 1"
              id="address"
              type="text"
              className={styles.input}
              required
              {...register('address')}
            />
            {errors && errors.address && (
              <p className={styles.error}>{errors.address.message}</p>
            )}
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
    </div>
  );
}

export default Form3;
