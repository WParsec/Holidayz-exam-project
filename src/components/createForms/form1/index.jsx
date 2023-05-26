import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must have minimum 3 letters')
    .max(100)
    .matches(
      /^[a-zA-Z0-9 .,!?-]*$/,
      'Unusual special characters are not allowed'
    ),
  description: yup
    .string()
    .required()
    .max(1000)
    .matches(
      /^[a-zA-Z0-9 æøå .,!?-]*$/,
      'Unusual special characters are not allowed'
    ),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required()
    .positive()
    .integer(),
  capacity: yup
    .number()
    .typeError('Capacity must be a number')
    .required()
    .positive()
    .integer()
    .max(100)
    .min(1, 'Capacity must be greater than 0'),
});

function Form1({
  styles,
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  capacity,
  setCapacity,
  setFormProgression,
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
      name: name,
      description: description,
      price: price,
      capacity: capacity,
    },
  });

  useEffect(() => {
    setValue('name', name);
    setValue('description', description);
    setValue('price', price);
    setValue('capacity', capacity);
  }, [name, description, price, capacity, setValue]);

  const onSubmit = (data) => {
    setName(data.name);
    setDescription(data.description);
    setPrice(data.price);
    setFormProgression(2);
    setCapacity(data.capacity);
  };

  return (
    <div className={styles.content_wrap}>
      <h1 className={styles.h1}>{title}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Name of Venue <span>*</span>
          </label>
          <input
            placeholder="Lovely Beach House"
            id="name"
            type="text"
            className={styles.input}
            required
            {...register('name')}
          />
          {errors && errors.name && (
            <p className={styles.error}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.flexed_inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="price" className={styles.label}>
              Price Per Night <span>*</span>
            </label>
            <input
              id="price"
              type="number"
              className={styles.input}
              required
              min={1}
              {...register('price')}
            />
            {errors && errors.price && (
              <p className={styles.error}>{errors.price.message}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="capacity" className={styles.label}>
              Max Capacity <span>*</span>
            </label>
            <input
              id="capacity"
              type="number"
              max={100}
              className={styles.input}
              required
              {...register('capacity')}
            />
            {errors && errors.capacity && (
              <p className={styles.error}>{errors.capacity.message}</p>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>
            Describe your Venue <span>*</span>
          </label>
          <textarea
            placeholder="A beautiful beach house with a view of the ocean."
            id="description"
            className={styles.input}
            maxLength="1000"
            required
            {...register('description')}
          />
          {errors && errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <div className={styles.next_div}>
          <button type="submit" className="cta cta_gradient">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form1;
