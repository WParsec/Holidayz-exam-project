import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import utils
import SEO from '../../utils/SEO';

// import components
import BackSection from '../../components/backSection';
import ProgressionBar from '../../components/progressionBar';
import Form1 from '../../components/createForms/form1';
import Form2 from '../../components/createForms/form2';
import Form3 from '../../components/createForms/form3';
import Form4 from '../../components/createForms/form4';

// Import styles and assets
import styles from '../create/create.module.scss';
import backgroundImage from '../../assets/backgrounds/anywhere-2.jpg';

// Import hooks
import useApi from '../../hooks/useApi';

function Update() {
  const { id } = useParams();
  // API
  const {
    data: venue,
    error,
    loading,
  } = useApi(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);

  console.log(venue);

  const [formProgression, setFormProgression] = useState(1);
  // States for form1
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [media, setMedia] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [continent, setContinent] = useState('');
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    if (venue && venue.location) {
      setName(venue.name);
      setDescription(venue.description);
      setPrice(venue.price);
      setMedia(venue.media);
      setAddress(venue.location.address);
      setCity(venue.location.city);
      setCountry(venue.location.country);
      setContinent(venue.location.continent);
      setCapacity(venue.maxGuests);
    }
  }, [venue]);

  const handlePrevious = () => {
    setFormProgression(formProgression - 1);
  };

  if (loading)
    //   Create a loading component thingy
    return (
      <main
        className={styles.main}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      >
        <SEO title="Update" description={'Update your venue on Holidayz'} />
        <BackSection text={'Exit'} />
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </main>
    );

  if (error)
    //   Create an error component thingy
    return (
      <main
        className={styles.main}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      >
        <SEO title="Update" description={'Update your venue on Holidayz'} />
        <BackSection text={'Exit'} />
        <div className="container">
          <h1>Something went wrong</h1>
        </div>
      </main>
    );

  return (
    <main
      className={styles.main}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <SEO title="Update" description={'Update your venue on Holidayz'} />
      <BackSection text={'Exit'} />
      <div className="container">
        <ProgressionBar
          progression={formProgression}
          setFormProgression={setFormProgression}
          styles={styles}
        />
        {formProgression === 1 && (
          <Form1
            styles={styles}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            setFormProgression={setFormProgression}
            capacity={capacity}
            setCapacity={setCapacity}
            title={'Update Your Venue'}
          />
        )}
        {formProgression === 2 && (
          <Form2
            styles={styles}
            media={media}
            setMedia={setMedia}
            handlePrevious={handlePrevious}
            setFormProgression={setFormProgression}
            title={'Edit Images'}
          />
        )}
        {formProgression === 3 && (
          <Form3
            styles={styles}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            continent={continent}
            setContinent={setContinent}
            formProgression={formProgression}
            setFormProgression={setFormProgression}
            handlePrevious={handlePrevious}
            title={'Edit Location'}
          />
        )}
        {formProgression === 4 && (
          <Form4
            styles={styles}
            name={name}
            description={description}
            price={price}
            media={media}
            address={address}
            city={city}
            country={country}
            continent={continent}
            capacity={capacity}
            handlePrevious={handlePrevious}
            title={'Verify and Update'}
            id={id}
          />
        )}
      </div>
    </main>
  );
}

export default Update;
