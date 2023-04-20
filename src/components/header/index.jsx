import React from 'react'

// Import styles
import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.logo_div}>
          <img src="/assets/logo.svg" alt="Logo" className={styles.logo} />
        </div>
      </div>
    </header>
  )
}

export default Header;
