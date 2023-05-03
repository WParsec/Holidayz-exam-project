import React from 'react';
import { useNavigate } from 'react-router-dom';

//   Export function that takes the user to the previous page
 function HandleBack({ styles }) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
    return (
        <button className={styles} onClick={handleBack}>Back</button>
    )
}

export default HandleBack;