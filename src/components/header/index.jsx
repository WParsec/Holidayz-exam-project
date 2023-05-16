import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import styles
import styles from './header.module.scss';

// Import assets
import logo from '../../assets/logo.svg';
import profile from '../../assets/icons/profile.svg';
import zoom from '../../assets/icons/zoom.svg';

// Import hooks
import useAuthStatus from '../../hooks/useAuthStatus';
import useLocalStorage from '../../hooks/useLocalStorage';

function Header() {
  const [showNav, setShowNav] = useState(false);
  const { isLoggedIn, logout } = useAuthStatus();
  const navigate = useNavigate();
  const { name, isVenueManager } = useLocalStorage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleNavBox = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.matches('.navBox')) {
        setShowNav(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header_wrap}>
          <div className={styles.logo_div}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles.logo} />
            </Link>
          </div>
          <nav>
            <Link to="/">
              <img src={zoom} alt="Search" />
            </Link>
            <button
              className="navIcon"
              onClick={(e) => {
                e.stopPropagation();
                toggleNavBox();
              }}
            >
              <img src={profile} alt="User icon" />
            </button>
            {showNav && (
              <div className={styles.navBox}>
                {isLoggedIn ? (
                  <div>
                    <Link to={`/profiles/${name}`}>Profile</Link>
                    {isVenueManager === 'true' && (
                      <Link className="cta" to="/venues/create">
                        Create Venue
                      </Link>
                    )}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                ) : (
                  <div>
                    <Link to="/auth">Login/Register</Link>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
