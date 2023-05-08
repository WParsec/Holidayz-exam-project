import React, { useState, useEffect, useRef } from 'react';

// Import components
import Hero from '../../components/hero';
import Grid from '../../components/grid';
import continents from '../../data/continents';

// Import hooks
import useApi from '../../hooks/useApi';

// Import styles and assets
import styles from './home.module.scss';
import anywhere from '../../assets/backgrounds/anywhere-2.jpg';

// Import utils
import getBackgroundImageUrl from '../../utils/getBackgroundImage';

// Import url's¨
import { getAllVenuesUrl } from '../../common/common';

// Date picker
import DatePicker from 'react-datepicker';
import { isAfter, isBefore } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateRangeInput from '../../components/customInput';

function Home() {
  const [backgroundImage, setBackgroundImage] = useState(anywhere);
  const { data: venues, isLoading, isError } = useApi(getAllVenuesUrl);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const gridRef = useRef();
  // Country filtering
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  // Date filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();
  // Filter bad items from the API
  const [venuesWithLocation, setVenuesWithLocation] = useState([]);

  useEffect(() => {
    // Remove venues that have Unknown in country, city or if media array is empty
    let filteredVenuesWithLocation = venues.filter((venue) => {
      return (
        venue.location.country !== 'Unknown' &&
        venue.location.city !== 'Unknown' &&
        venue.media.length > 0
      );
    });
    setVenuesWithLocation(filteredVenuesWithLocation);
    setFilteredVenues(filteredVenuesWithLocation);
  }, [venues]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter venues by continent
  const handleFilterByContinent = (continent, index) => {
    setActiveIndex(index);
    const normalizedContinent = continent.toLowerCase();
    setSearchQuery(normalizedContinent);
    setBackgroundImage(getBackgroundImageUrl(normalizedContinent));

    if (normalizedContinent === 'anywhere') {
      setSearchQuery('');
      setFilteredVenues(venuesWithLocation);
      setCountries([]);
      setActiveCountry(null);
    } else {
      const filtered = venuesWithLocation.filter(
        (venue) =>
          venue.location.continent.toLowerCase() === normalizedContinent
      );
      setFilteredVenues(filtered);
      const countriesInContinent = [
        ...new Set(filtered.map((venue) => venue.location.country)),
      ];
      setCountries(countriesInContinent);
      setActiveCountry(null);
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
      const filteredByCountry = venuesWithLocation.filter(
        (venue) =>
          venue.location.country === country &&
          venue.location.continent.toLowerCase() ===
            continents[activeIndex].toLowerCase()
      );
      setFilteredVenues(filteredByCountry);
    }
  };

  // Handle date change
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Handle form search
  const handleFormSearch = (e) => {
    e.preventDefault();

    const filteredBySearch = venuesWithLocation.filter((venue) => {
      // Check if venue matches the search query
      const matchesQuery =
        venue.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.country
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        venue.location.continent
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        venue.name.toLowerCase().includes(searchQuery.toLowerCase());

      // If startDate and endDate are selected, filter out venues with overlapping bookings
      if (startDate && endDate) {
        const hasOverlappingBooking =
          venue.bookings &&
          venue.bookings.some((booking) => {
            const bookingStartDate = new Date(booking.dateFrom);
            const bookingEndDate = new Date(booking.dateTo);
            return (
              (isAfter(startDate, bookingStartDate) &&
                isBefore(startDate, bookingEndDate)) ||
              (isAfter(endDate, bookingStartDate) &&
                isBefore(endDate, bookingEndDate))
            );
          });

        return matchesQuery && !hasOverlappingBooking;
      }

      // If no date range is selected, return venues matching the search query
      return matchesQuery;
    });

    setFilteredVenues(filteredBySearch);

    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <Hero backgroundImage={backgroundImage}>
        <div className={styles.search_filter_wrap}>
          <form className={styles.search_form} onSubmit={handleFormSearch}>
            <div className={styles.search_and_button_wrap}>
              <div className={styles.search_div}>
                <label htmlFor="search">Where?</label>
                <input
                  type="text"
                  name="search"
                  className={styles.search_input}
                  placeholder="Bangkok, Paris, New York..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              {/* <button className={styles.advanced_desktop}><img src={filterIcon} alt="filter"/></button> */}
            </div>
            <div className={styles.date_and_filter}>
              <label htmlFor="dateFrom">Date from/to</label>
              <div className={styles.date_div}>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  dateFormat="dd-MM-yyyy"
                  minDate={today}
                  customInput={<CustomDateRangeInput customStyles={styles} />}
                />
                {/* <button className={styles.advanced_desktop}><img src="/assets/icons/filter.svg" alt="filter" /></button> */}
              </div>
            </div>
            <div className="button_wrap">
              <button onClick={handleFormSearch} className="cta cta_gradient">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className={styles.filter_div}>
          {continents.map((continent, index) => (
            <button
              className={`${styles.continent} ${
                index === activeIndex ? styles.active : ''
              }`}
              key={index}
              onClick={() => handleFilterByContinent(continent, index)}
            >
              {continent}
            </button>
          ))}
        </div>
        {countries.length > 0 && (
          <div className={styles.filter_countries_div}>
            <button
              className={`${styles.country} ${
                activeCountry === null ? styles.active : ''
              }`}
              onClick={() => handleFilterByCountry(null)}
            >
              All
            </button>
            {countries.map((country, index) => (
              <button
                className={`${styles.country} ${
                  country === activeCountry ? styles.active : ''
                }`}
                key={index}
                onClick={() => handleFilterByCountry(country)}
              >
                {country}
              </button>
            ))}
          </div>
        )}
      </Hero>
      <Grid venues={filteredVenues} ref={gridRef} />
    </main>
  );
}

export default Home;
