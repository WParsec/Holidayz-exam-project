import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import components
import BackSection from '../../components/backSection';
import ProfileBookings from '../../components/profileBookings';

// Import url
import { profileUrl } from '../../common/common';

// Import styles and assets
import styles from './profile.module.scss';
import backgroundImage from '../../assets/backgrounds/leaf.jpg';
import placeholder from '../../assets/userPlaceholder.jpg';
import pen from '../../assets/icons/pen.svg';

// Import hooks
import useApi from '../../hooks/useApi';
import useUserData from '../../hooks/useLocalStorage';
import useAvatar from '../../hooks/useAvatar';

// Import utils
import SEO from '../../utils/SEO.jsx';

function Profile() {
  const { name, accessToken } = useUserData();
  const url = name ? profileUrl + name + '?_venues=true&_bookings=true' : null; // Ran into async trouble. Url will now be null if name is not defined and thus the useAPI hook will not run until name is defined.
  const { data, isError, isLoading, errorMessage } = useApi(url, accessToken);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [venueManager, setVenueManager] = useState(false);
  const [venues, setVenues] = useState([]);
  const [isDisplayingForm, setIsDisplayingForm] = useState(false);
  const {
    updateAvatar,
    isError: isAvatarError,
    errorMessage: avatarErrorMessage,
  } = useAvatar(name, accessToken);

  useEffect(() => {
    if (data) {
      const { avatar, name, venueManager, venues: yourVenues } = data;
      setAvatarUrl(avatar);
      setProfileName(name);
      setVenueManager(venueManager);
      setVenues(yourVenues);
    }
  }, [data]);

  console.log('DATA', data);
  console.log('VENUES', venues);

  const handleEditAvatar = () => {
    setIsDisplayingForm(!isDisplayingForm);
  };

  const handleAvatarUpdate = async (newAvatarUrl) => {
    const updated = await updateAvatar(newAvatarUrl, accessToken);
    if (updated) {
      setAvatarUrl(updated.avatar);
      setIsDisplayingForm(false);
    }
  };

  if (isLoading) {
    return (
      <main
        className={styles.main}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container">
          <div className={styles.loading}>Loading...</div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main
        className={styles.main}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container">
          <div className={styles.failed}>
            Something went wrong: {errorMessage}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className={styles.main}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <SEO
        title="Profile"
        description={
          'Your profile page on Holidayz. View upcoming and past bookings, and manage your venues.'
        }
      />
      <BackSection />
      <section>
        <div className="container">
          <div className={styles.user_wrap}>
            <div className={styles.user_flex}>
              <div className={styles.image_and_name_flex}>
                <div className={styles.user}>
                  <div className={styles.user_avatar_and_edit}>
                    <div className={styles.image_div}>
                      <img src={avatarUrl || placeholder} alt={profileName} />
                    </div>
                    {name === profileName && (
                      <div className={styles.edit_div}>
                        <button
                          className={styles.edit_button}
                          onClick={handleEditAvatar}
                        >
                          {isDisplayingForm ? 'X' : <img src={pen} alt="pen" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.user_info}>
                  <h4>{profileName}</h4>
                  <p>{venueManager ? 'Venue Manager' : 'Client'}</p>
                </div>
              </div>
              <div
                className={`${styles.animation} ${
                  isDisplayingForm ? styles.animationActive : ''
                }`}
              >
                {isDisplayingForm && (
                  <form
                    className={`${styles.form} ${
                      isDisplayingForm ? styles.formActive : ''
                    }`}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAvatarUpdate(e.target.elements[0].value);
                    }}
                  >
                    <input type="text" placeholder="Insert avatar URL" />
                    <button
                      className={`cta_gradient ${styles.submit}`}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
              <div className={styles.error}>
                {isAvatarError && isDisplayingForm ? (
                  <p>Error: {avatarErrorMessage}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className={styles.venues_wrap}>
            <h3>My Venues</h3>
            <div className={styles.your_venues_grid}>
              {venues && venues.length > 0
                ? venues.map((venue) => {
                    const { id, name, media } = venue;
                    return (
                      <div className={styles.venue} key={id}>
                        <Link to={`/venue/${id}`}>
                          <div className={styles.venue_image}>
                            <img src={media[0]} alt={name} />
                          </div>
                          <div className={styles.venue_name}>
                            <h4>{name}</h4>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                : ''}
            </div>
          </div>
        </div>
      </section>
      <section>
        <ProfileBookings url={profileUrl + name} accessToken={accessToken} />
      </section>
    </main>
  );
}

export default Profile;
