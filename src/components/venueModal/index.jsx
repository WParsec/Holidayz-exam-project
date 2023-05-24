import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import styles
import styles from './venueModal.module.scss';

// Import hook
import useDelete from '../../hooks/useDelete';
import useUserData from '../../hooks/useLocalStorage';

// Import url
import { createVenueUrl } from '../../common/common';

function VenueModal({ title, setDisplayModal, handleEditClick, id }) {
  const firstElementRef = useRef();
  const lastElementRef = useRef();
  const { accessToken } = useUserData();
  const { deleteItem } = useDelete(createVenueUrl, accessToken);
  const navigate = useNavigate();
  const handleCancel = () => {
    setDisplayModal(false);
    handleEditClick();
  };

  const handleDeleteVenue = async () => {
    await deleteItem(id);
    navigate('/');
  };

  useEffect(() => {
    firstElementRef.current.focus();
  }, []);

  // Function to handle keydown event
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElementRef.current) {
          lastElementRef.current.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElementRef.current) {
          firstElementRef.current.focus();
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div className={styles.modal_div} onKeyDown={handleKeyDown}>
      <div className={styles.modal_content}>
        <h2 ref={firstElementRef} tabIndex="0">
          {title}
        </h2>
        <p>Are you sure you want to delete the venue?</p>
        <div className={styles.button_flex}>
          <button onClick={handleDeleteVenue} className="danger_button">
            Delete
          </button>
          <button
            ref={lastElementRef}
            onClick={handleCancel}
            className="cancel_button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default VenueModal;
