import React, { useMemo } from 'react';

import { DropdownSelection } from '../DropdownSelection/DropdownSelection';

const emptyOption = { id: '', name: '-- Select a value --' };

const LocationSelect = ({ className = '', options = [], setValue, value }) => {
  const allOptions = useMemo(() => [emptyOption, ...options], [options]);

  return (
    <DropdownSelection
      caption="Location Name"
      className={className}
      extraSpace
      options={allOptions}
      viewKey="name"
      selectKey="id"
      initialSelection={allOptions.findIndex((option) => option.id === value)}
      selectionHandler={([_index, id]) => setValue(id)}
    />
  );
};

export default LocationSelect;
