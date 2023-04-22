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
    'ANYWHERE',
    'ASIA',
    'EUROPE',
    'AFRICA',
    'SOUTH AMERICA',
    'NORTH AMERICA',
    'AUSTRALIA',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilterByContinent = (continent, index) => {
    setActiveIndex(index);
    switch (continent) {
      case 'ANYWHERE':
        setBackgroundImage('/assets/backgrounds/anywhere.jpg');
        break;
      case 'ASIA':
        setBackgroundImage('/assets/backgrounds/asia.jpg');
        break;
      case 'EUROPE':
        setBackgroundImage('/assets/backgrounds/europe.jpg');
        break;
      case 'AFRICA':
        setBackgroundImage('/assets/backgrounds/africa.jpg');
        break;
      case 'SOUTH AMERICA':
        setBackgroundImage('/assets/backgrounds/south-america.jpg');
        break;
      case 'NORTH AMERICA':
        setBackgroundImage('/assets/backgrounds/north-america.jpg');
        break;
      case 'AUSTRALIA':
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
