import React, {useState} from 'react'

// Import components
import Hero from '../../components/hero'
import Grid from '../../components/grid'

// Import hooks
import useApi from '../../hooks/useApi';

// Import styles
import styles from './home.module.scss'

function Home() {
  const [backgroundImage, setBackgroundImage] = useState('/assets/backgrounds/anywhere.jpg');
  const { data: venues, isLoading, isError } = useApi('https://api.noroff.dev/api/v1/holidaze/venues');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const continents = [
    'Anywhere',
    'Asia',
    'Europe',
    'Africa',
    'South America',
    'North America',
    'Oceania',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilterByContinent = (continent) => {
  };

  return (
    <main>
      <Hero backgroundImage={backgroundImage}>
        <div className={styles.search_div}>

        </div>
        <div className={styles.filter_div}>
            {continents.map((continent, index) => (
              <button className={styles.continent} key={index} onClick={() => handleFilterByContinent(continent)}>
                {continent}
              </button>
            ))}
        </div>
      </Hero>
      <Grid venues={venues} />
    </main>
  );
}

export default Home;
