import React, { useState, useEffect } from 'react'

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
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFilteredVenues(venues);
  }, [venues]);


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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };



  // Filter venues by continent
  const handleFilterByContinent = (continent, index) => {
    setActiveIndex(index);
    const normalizedContinent = continent.toLowerCase();
    setSearchQuery(normalizedContinent);
  
    if (normalizedContinent === 'anywhere') {
      setFilteredVenues(venues);
    } else {
      const filtered = venues.filter((venue) => venue.location.continent.toLowerCase() === normalizedContinent);
      setFilteredVenues(filtered);
    }
  
    // Update the background image
    switch (normalizedContinent) {
      case 'anywhere':
        setBackgroundImage('/assets/backgrounds/anywhere.jpg');
        break;
      case 'asia':
        setBackgroundImage('/assets/backgrounds/asia.jpg');
        break;
      case 'europe':
        setBackgroundImage('/assets/backgrounds/europe.jpg');
        break;
      case 'africa':
        setBackgroundImage('/assets/backgrounds/africa.jpg');
        break;
      case 'south america':
        setBackgroundImage('/assets/backgrounds/south-america.jpg');
        break;
      case 'north america':
        setBackgroundImage('/assets/backgrounds/north-america.jpg');
        break;
      case 'australia':
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
          <form className={styles.search_form}>
            <input 
              type="text"
              className={styles.search_input}
              placeholder="Bangkok, Paris, New York..."
              value={searchQuery}
              onChange={handleSearchChange}
              />
          </form>
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
      <Grid venues={filteredVenues} />
    </main>
  );
}

export default Home;
