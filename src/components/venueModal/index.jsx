import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import styles
import styles from './venueModal.module.scss';

// Import hook
import useDelete from '../../hooks/useDelete';
import useUserData from '../../hooks/useLocalStorage';

// Import url
import { createVenueUrl } from '../../common/common';

function VenueModal({ title, setDisplayModal, handleEditClick, id }) {
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

  return (
    <div className={styles.modal_div}>
      <div className={styles.modal_content}>
        <h2>{title}</h2>
        <p>Are you sure you want to delete the venue?</p>
        <div className={styles.button_flex}>
          <button onClick={handleDeleteVenue} className="danger_button">
            Delete
          </button>
          <button onClick={handleCancel} className="cancel_button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default VenueModal;
