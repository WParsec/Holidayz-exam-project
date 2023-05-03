import React from 'react'
import { useNavigate } from 'react-router-dom';


// Import styles and assets
import styles from "./backSectionVenue.module.scss"

// Import util
import HandleBack from '../../utils/handleBack';

function BackSectionVenue() {

  return (
    <section className={styles.back_section}>
      <div className='container'>
        <div className={styles.back_div}>
            <HandleBack styles={styles}/>
        </div>
      </div>
    </section>
  )
}

export default BackSectionVenue;
