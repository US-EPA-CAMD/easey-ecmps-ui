import React, { useMemo } from 'react';

import { getReportingPeriods } from '../../utils/functions';
import { DropdownSelection } from '../DropdownSelection/DropdownSelection';

const emptyOption = { value: '', label: '-- Select a value --' };

const ReportingPeriodSelect = ({ className = '', setValue, value }) => {
  const options = useMemo(() => {
    const periods = getReportingPeriods();
    return [
      emptyOption,
      ...periods.map((period) => ({ label: period, value: period })),
    ];
  }, []);

  return (
    <DropdownSelection
      caption="Year / Quarter"
      className={className}
      extraSpace
      initialSelection={options.findIndex((option) => option.value === value)}
      options={options}
      selectKey="value"
      selectionHandler={([_i, v]) => setValue(v)}
      viewKey="label"
    />
  );
};

export default ReportingPeriodSelect;
