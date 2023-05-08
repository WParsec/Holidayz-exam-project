import React from 'react';

const CustomDateRangeInput = React.forwardRef((props, ref) => {
  const { value, onClick, customStyles } = props;

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.click();
    }
  }

  return (
    <input
      type="text"
      className={customStyles.customInput}
      value={value}
      onClick={onClick}
      placeholder="dd-MM-yyyy"
      onChange={(e) => (e.target.value = value)}
      ref={ref}
      onKeyDown={handleKeyDown}
      readOnly
    />
  );
});

export default CustomDateRangeInput;
