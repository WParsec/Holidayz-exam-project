import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import components
import YourReservations from '../yourReservations';

function YourVenuesGrid({ venues, styles }) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (venues && venues.length > 0) {
      setSelectedId(venues[0].id);
    }
  }, [venues]);

  return (
    <div>
      <div className={styles.venues_wrap}>
        <h2>My Venues</h2>
        <div className={styles.your_venues_grid}>
          {venues && venues.length > 0 ? (
            venues.map((venue) => {
              const { id, name, media } = venue;
              return (
                <div className={styles.venue} key={id}>
                  <div>
                    <div
                      className={styles.venue_image}
                      onClick={() => setSelectedId(id)}
                    >
                      <img src={media[0]} alt={name} />
                    </div>
                    <div className={styles.venue_name}>
                      <h4>{name}</h4>
                    </div>
                  </div>
                  <Link to={`/venue/${id}`}>Go to Venue</Link>
                </div>
              );
            })
          ) : (
            <p>You don't have any venues yet.</p>
          )}
        </div>
      </div>
      {selectedId && venues && venues.length > 0 && (
        <YourReservations selectedId={selectedId} />
      )}
    </div>
  );
}

export default YourVenuesGrid;
