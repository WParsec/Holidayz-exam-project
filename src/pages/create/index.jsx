import React, { useState } from 'react';

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
import styles from './create.module.scss';
import backgroundImage from '../../assets/backgrounds/anywhere-2.jpg';

function Create() {
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

  const handlePrevious = () => {
    setFormProgression(formProgression - 1);
  };

  return (
    <main
      className={styles.main}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <SEO
        title="Create"
        description={'Create and list your venue for clients across the globe'}
      />
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
          />
        )}
        {formProgression === 2 && (
          <Form2
            styles={styles}
            media={media}
            setMedia={setMedia}
            handlePrevious={handlePrevious}
            setFormProgression={setFormProgression}
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
          />
        )}
      </div>
    </main>
  );
}

export default Create;
