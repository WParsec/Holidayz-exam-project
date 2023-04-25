import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

// Import styles
import styles from './header.module.scss';

function Header() {
  const [showNav, setShowNav] = useState(false);

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
            <Link to='/'><img src="/assets/logo.svg" alt="Logo" className={styles.logo} /></Link>
          </div>
          <nav>
            <Link to='/'><img src="/assets/icons/zoom.svg" alt="Search" /></Link>
              <button className="navIcon" onClick={(e) => { e.stopPropagation(); toggleNavBox(); }}>
                <img src="/assets/icons/profile.svg" alt="User icon" />
              </button>
            {showNav && (
              <div className={styles.navBox}>
                <Link to='/auth'>Login/Register</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;
