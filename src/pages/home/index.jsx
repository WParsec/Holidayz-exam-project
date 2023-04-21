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
  const [activeIndex, setActiveIndex] = useState(0);

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
    'Australia',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilterByContinent = (continent, index) => {
    setActiveIndex(index);
    switch (continent) {
      case 'Anywhere':
        setBackgroundImage('/assets/backgrounds/anywhere.jpg');
        break;
      case 'Asia':
        setBackgroundImage('/assets/backgrounds/asia.jpg');
        break;
      case 'Europe':
        setBackgroundImage('/assets/backgrounds/europe.jpg');
        break;
      case 'Africa':
        setBackgroundImage('/assets/backgrounds/africa.jpg');
        break;
      case 'South America':
        setBackgroundImage('/assets/backgrounds/south-america.jpg');
        break;
      case 'North America':
        setBackgroundImage('/assets/backgrounds/north-america.jpg');
        break;
      case 'Australia':
        setBackgroundImage('/assets/backgrounds/australia.jpg');
        break;
      default:
        break;
    }
  };  

  return (
    <main>
      <Hero backgroundImage={backgroundImage}>
        <div className={styles.search_div}>

        </div>
        <div className={styles.filter_div}>
            {continents.map((continent, index) => (
              <button className={`${styles.continent} ${index === activeIndex ? styles.active : ''}`}
               key={index} onClick={() => handleFilterByContinent(continent, index)}>
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
