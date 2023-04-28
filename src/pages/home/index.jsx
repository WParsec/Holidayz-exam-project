import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'

// Import components
import Hero from '../../components/hero'
import Grid from '../../components/grid'

// Import hooks
import useApi from '../../hooks/useApi';

// Import styles
import styles from './home.module.scss'

function Home() {
  const [backgroundImage, setBackgroundImage] = useState('/assets/backgrounds/anywhere.jpg');
  const { data: venues, isLoading, isError } = useApi('https://api.noroff.dev/api/v1/holidaze/venues?limit=100');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  // Country filtering
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  // Date filtering
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');


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
      setSearchQuery('');
      setFilteredVenues(venues);
      setCountries([]);
      setActiveCountry(null);
    } else {
      const filtered = venues.filter((venue) => venue.location.continent.toLowerCase() === normalizedContinent);
      setFilteredVenues(filtered);
      const countriesInContinent = [...new Set(filtered.map((venue) => venue.location.country))];
      setCountries(countriesInContinent);
      setActiveCountry(null);
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

  // Filter venues by country
  const handleFilterByCountry = (country) => {
    setActiveCountry(country);
    if (country === null) {
      handleFilterByContinent(continents[activeIndex], activeIndex);
    } else {
      const normalizedCountry = country.toLowerCase();
      setSearchQuery(normalizedCountry);
      const filteredByCountry = venues.filter((venue) => venue.location.country === country && venue.location.continent.toLowerCase() === continents[activeIndex].toLowerCase());
      setFilteredVenues(filteredByCountry);
    }
  };
  
  // Open date picker onClick
  const handleInputClick = (e) => {
    e.target.focus();
  };

  return (
    <main>
      <Hero backgroundImage={backgroundImage}>
        <div className={styles.search_filter_wrap}>
          <form className={styles.search_form}>
            <div className={styles.search_and_button_wrap}>
              <div className={styles.search_div}>
                <label htmlFor="search">Where?</label>
                <input
                  type="text"
                  name='search'
                  className={styles.search_input}
                  placeholder="Bangkok, Paris, New York..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  />
              </div>
              <button className={styles.advanced_desktop}><img src="/assets/icons/filter.svg" alt="filter" /></button>
            </div>
            <div className={styles.date_and_filter}>
              <label htmlFor="dateFrom">Date from/to</label>
              <div className={styles.date_div}>
                <input 
                type="date" 
                name='dateFrom'
                className={styles.date_input}
                value={dateFrom}
                onClick={handleInputClick}
                onChange={(e) => setDateFrom(e.target.value)}/>
                <button className={styles.advanced_desktop}><img src="/assets/icons/filter.svg" alt="filter" /></button>
              </div>
            </div>
            <div className='button_wrap'>
              <button className='cta'>Search</button>
            </div>
          </form>
        </div>
        <div className={styles.filter_div}>
          {continents.map((continent, index) => (
            <button className={`${styles.continent} ${index === activeIndex ? styles.active : ""}`}
              key={index}
              onClick={() => handleFilterByContinent(continent, index)}>
              {continent}
            </button>
          ))}
        </div>
        {countries.length > 0 && (
          <div className={styles.filter_countries_div}>
            <button
              className={`${styles.country} ${activeCountry === null ? styles.active : ""}`}
              onClick={() => handleFilterByCountry(null)}>
              All
            </button>
            {countries.map((country, index) => (
              <button
                className={`${styles.country} ${country === activeCountry ? styles.active : ""}`} key={index} onClick={() => handleFilterByCountry(country)}>
                {country}
              </button>
            ))}
          </div>
        )}
      </Hero>
      <Grid venues={filteredVenues} />
    </main>
  );  
}
  

export default Home;
