import React from 'react';
import { useParams } from 'react-router-dom';

function Venue() {
  const { id } = useParams();

  return (
    <main>
      <section>
        <div className='container'>
          <h1>Venue ID: {id}</h1>
        </div>
      </section>
    </main>
  );
}

export default Venue;

