import { Label, DatePicker as UswdsDatePicker } from '@trussworks/react-uswds';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';

function parseDatePickerString(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().substring(0, 10);
}

export const DatePicker = ({
  className = '',
  label,
  placeholder = 'mm/dd/yyyy',
  setValue,
  value,
}) => {
  const [id] = useState(uniqueId(`${label.replace(' ', '')}-date-picker-`));

  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <UswdsDatePicker
        className="padding-right-15"
        defaultValue={value}
        id={id}
        name={label}
        onChange={(e) => setValue(parseDatePickerString(e))}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default DatePicker;
