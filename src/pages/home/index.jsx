import React, {useState} from 'react'

// Import components
import Hero from '../../components/hero'

function Home() {
  const [backgroundImage, setBackgroundImage] = useState('/assets/backgrounds/anywhere.jpg');

  return (
    <main>
      <Hero backgroundImage={backgroundImage} />
    </main>
  )
}

export default Home;
