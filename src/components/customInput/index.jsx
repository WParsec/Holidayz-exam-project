
import React from 'react';

const CustomDateRangeInput = React.forwardRef((props, ref) => {
  const { value, onClick, customStyles } = props;

  return (
    <input
      type="text"
      className={customStyles.customInput}
      value={value}
      onClick={onClick}
      placeholder="dd-MM-yyyy"
      onChange={(e) => (e.target.value = value)}
      ref={ref}
      readOnly
    />
  );
});

export default CustomDateRangeInput;

