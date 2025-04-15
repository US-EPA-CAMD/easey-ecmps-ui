import { Label, TextInput as UswdsTextInput } from '@trussworks/react-uswds';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';

const TextInput = ({
  label,
  placeholder = 'Enter text...',
  setValue,
  value,
}) => {
  const [id] = useState(uniqueId(`${label.replace(' ', '')}-text-input-`));

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <UswdsTextInput
        className="margin-top-1"
        id={id}
        name={label}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </>
  );
};

export default TextInput;
