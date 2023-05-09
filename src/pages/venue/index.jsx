import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// import components
import BackSectionVenue from '../../components/backSectionVenue/index.jsx';
import Slider from '../../components/venueSlider/index.jsx';
import CustomDateRangeInput from '../../components/customInput/index.jsx';
import VenueCalendar from '../../components/calendar/index.jsx';

// Import styles and assets
import styles from './venue.module.scss';
import star from '../../assets/icons/star.svg';
import pin from '../../assets/icons/location_pin.svg';
import placeholderAvatar from '../../assets/placeholder_avatar.jpg';

// Import hooks
import useApi from '../../hooks/useApi';

// Date picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Venue() {
  const { id } = useParams();
  const {
    data: venue,
    error,
    loading,
  } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  // Date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();
  // Is the venue booked
  const [isBooked, setIsBooked] = useState(false);

  // Number of nights and total price
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  // Destructure the venue object
  const {
    description,
    location,
    maxGuests,
    media,
    meta,
    name,
    owner,
    price,
    rating,
  } = venue;

  // GPT function to handle scroll index
  const handleScroll = (e) => {
    const slider = e.target;
    let closestIndex = 0;
    let minDistance = Number.MAX_VALUE;

    // Loop through the children of the slider (image containers)
    for (let i = 0; i < slider.children.length; i++) {
      const child = slider.children[i];
      const distance = Math.abs(child.offsetLeft - slider.scrollLeft);

      // Find the child with the smallest distance to the left edge of the slider
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    // Update the index if it has changed
    if (closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Check if selected dates or dates in between are already booked
    const bookedDates = [];
    venue.bookings.forEach((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);

      // Calculate the difference between start and end dates in days
      const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

      for (let i = 0; i <= diffInDays; i++) {
        const current = new Date(start);
        current.setDate(current.getDate() + i);
        bookedDates.push(current);
      }
    });

    // Check if selected dates are already booked
    const booked = bookedDates.some(
      (bookedDate) => bookedDate >= start && bookedDate <= end
    );
    setIsBooked(booked);

    if (start && end) {
      const nightsDifference = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      setNights(nightsDifference);
      setTotalPrice(nightsDifference * price);
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  };

  return (
    <main>
      <BackSectionVenue />
      <div className={styles.top_flex}>
        <div className={styles.left_side}>
          {media && (
            <Slider
              media={media}
              currentIndex={currentIndex}
              handleScroll={handleScroll}
              sliderTopLevel={styles.slider_top_level}
              sliderDiv={styles.slider_div}
              imageContainer={styles.image_container}
              sliderImage={styles.slider_image}
              back={styles.back}
              indexIndicator={styles.index_indicator}
              sliderScrollDiv={styles.slider_scroll_div}
            />
          )}
          <div className={styles.owner_div}>
            {owner ? (
              <>
                <div className={styles.avatar_div}>
                  {owner.avatar !== null ? (
                    <img
                      src={owner.avatar}
                      alt="avatar"
                      className={styles.avatar}
                    />
                  ) : (
                    <img
                      src={placeholderAvatar}
                      alt="avatar"
                      className={styles.avatar}
                    />
                  )}
                </div>
                <div>
                  <h4>{owner.name}</h4>
                  <p className={styles.member_since}>Member since 2023</p>
                </div>
              </>
            ) : (
              <p>Loading owner...</p>
            )}
          </div>
        </div>
        <div className={styles.right_side}>
          <div className={styles.right_side_top}>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.rating}>
              <p className={styles.rating_text}>
                Rating: {rating} <img src={star} alt="star" />
              </p>
            </div>
          </div>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
          <div className={styles.meta}>
            {meta &&
              Object.entries(meta).map(([key, value]) => {
                if (value) {
                  return <h4 key={key}>{key}</h4>;
                }
                return null;
              })}
          </div>
          <div className={styles.maxGuests}>
            <h4>Max guests: {maxGuests}</h4>
          </div>
          <div className={styles.location}>
            {location && (
              <h4>
                {location.city}, {location.country} <img src={pin} alt="" />
              </h4>
            )}
          </div>
          <div className={styles.price}>
            <h4>
              Price: {price} NOK <span>/ night</span>
            </h4>
          </div>
        </div>
      </div>
      <div className={styles.venue_bottom}>
        <div className="container">
          <div className={styles.venue_bottom_flex}>
            <div className={styles.bottom_left}>
              {venue.bookings && <VenueCalendar bookings={venue.bookings} />}
            </div>
            <div className={styles.bottom_right}>
              <div className={styles.booking_form_div}>
                <form>
                  <div className={styles.date_and_guests_flex}>
                    <div className={styles.date_div}>
                      <label htmlFor="dateFrom">Date from/to</label>
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        dateFormat="dd-MM-yyyy"
                        minDate={today}
                        customInput={
                          <CustomDateRangeInput customStyles={styles} />
                        }
                      />
                    </div>
                    <div className={styles.guest_amount_div}>
                      <label htmlFor="guestAmount">Number of guests</label>
                      <select name="guestAmount" id="guestAmount">
                        {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                          (guest) => (
                            <option key={guest} value={guest}>
                              {guest} guest
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className={styles.booking_error_div}>
                    {isBooked && (
                      <p className={styles.is_booked}>
                        One or more of the selected days are already booked
                      </p>
                    )}
                  </div>
                  <div className={styles.summary}>
                    <p>Night(s): {nights}</p>
                    <p>
                      Total Price: <span>{totalPrice} NOK</span>
                    </p>
                  </div>
                  <div className={styles.button_div}>
                    <button
                      className={
                        isBooked ? `cta cta_disabled` : `cta cta_gradient`
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Venue;
