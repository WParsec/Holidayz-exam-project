import React from 'react';
import { useNavigate } from 'react-router-dom';

//   Export function that takes the user to the previous page
function HandleBack({ styles, text }) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  if (!text) {
    text = 'Back';
  }
  return (
    <button className={styles} onClick={handleBack}>
      {text}
    </button>
  );
}

export default HandleBack;
