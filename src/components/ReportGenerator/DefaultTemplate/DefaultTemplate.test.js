import React from 'react';
import { render } from '@testing-library/react';
import DefaultTemplate from './DefaultTemplate';

const props = {
  data: [
    {
      col1: 'CS0AAN',
      col2: 'CO2',
      col3: 'AA8',
      col4: 'High Range',
      col5: 'No',
      col6: '10/01/1993 00:00',
      col7: '11/06/2019 14:00',
    },
    {
      col1: 'CS0AAN',
      col2: 'CO2',
      col3: 'LK1',
      col4: 'High Range',
      col5: 'No',
      col6: '01/01/2006 00:00',
      col7: '03/31/2006 23:00',
    },
    {
      col1: 'CS0AAN',
      col2: 'CO2',
      col3: 'CO2',
      col4: 'High Range',
      col5: 'No',
      col6: '11/06/2019 15:00',
      col7: null,
    },
    {
      col1: 'CS0AAN',
      col2: 'NOX',
      col3: 'AA7',
      col4: 'High Range',
      col5: 'No',
      col6: '10/01/1993 00:00',
      col7: '11/06/2019 14:00',
    },
    {
      col1: 'CS0AAN',
      col2: 'NOX',
      col3: 'NOX',
      col4: 'High Range',
      col5: 'No',
      col6: '11/06/2019 15:00',
      col7: null,
    },
    {
      col1: 'CS0AAN',
      col2: 'SO2',
      col3: 'AA6',
      col4: 'High Range',
      col5: 'No',
      col6: '10/01/1993 00:00',
      col7: '06/30/2019 23:00',
    },
  ],
  title: 'Analyzer Ranges',
  codeGroups: [
    {
      name: 'Component Type Codes',
      items: [
        {
          code: 'CO2',
          description: 'CO2 Concentration',
        },
        {
          code: 'NOX',
          description: 'NOx Concentration',
        },
        {
          code: 'SO2',
          description: 'SO2 Concentration',
        },
      ],
    },
  ],
  columnNames: [
    'Unit/Stack',
    'Component Type Code',
    'Component Id',
    'Range Level',
    'Dual Range Indicator',
    'Begin Date/Hr',
    'End Date/Hr',
  ],
  dataLoaded: true,
};
const { data, title, codeGroups, columnNames, dataLoaded } = props;
describe('DefaultTemplate', () => {
  it('renders nothing if there is no data', () => {
    const { container } = render(<DefaultTemplate data={null} />);
    expect(container.querySelectorAll('div').length).toBe(0);
  });

  it('renders data table if there is data', () => {
    const { container } = render(
      <DefaultTemplate
        data={data}
        codeGroups={codeGroups}
        columnNames={columnNames}
        dataLoaded={dataLoaded}
        title={title}
      />
    );
    expect(container.querySelectorAll('div')).not.toBe(0);
  });
});
