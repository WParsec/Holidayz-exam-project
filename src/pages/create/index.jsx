import React, { useState } from 'react';

// Import utils
import SEO from '../../utils/SEO';

// import components
import BackSection from '../../components/backSection';
import ProgressionBar from '../../components/progressionBar';
import Form1 from '../../components/createForms/form1';
import Form2 from '../../components/createForms/form2';
import Form3 from '../../components/createForms/form3';

// Import styles and assets
import styles from './create.module.scss';
import backgroundImage from '../../assets/backgrounds/leaf.jpg';

function Create() {
  const [formProgression, setFormProgression] = useState(1);
  // States for form1
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [media, setMedia] = useState([]);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
            media={media}
            setMedia={setMedia}
          />
        )}
        {formProgression === 2 && <Form2 styles={styles} />}
        {formProgression === 3 && <Form3 styles={styles} />}
      </div>
    </main>
  );
}

export default Create;
