import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyTableTemplate from './PropertyTableTemplate';
import _ from 'lodash';

const props = {
  data: {
    facilityName: 'Greene County',
    orisCode: '10',
    stateCode: 'AL',
    countyName: 'Greene County',
    latitude: '32.6017',
    longitude: '-87.7811',
  },
  title: 'Facility Information',
  columnGroups: [
    [
      {
        name: 'facilityName',
        displayName: 'Facility Name',
      },
      {
        name: 'orisCode',
        displayName: 'Facility ID (ORISPL)',
      },
      {
        name: 'stateCode',
        displayName: 'State',
      },
      {
        name: 'countyName',
        displayName: 'County',
      },
      {
        name: 'latitude',
        displayName: 'Latitude',
      },
      {
        name: 'longitude',
        displayName: 'Longitude',
      },
    ],
  ],
};
const { data, title, columnGroups } = props;

describe('PropertyTableTemplate', () => {
  it('renders without error', () => {
    render(<PropertyTableTemplate data={data} columnGroups={columnGroups} title={title} />);
    const reportTitle = screen.getByText(title);
    expect(reportTitle).toBeInTheDocument();
  });

  it('displays unit stack id in title if there is unitStack id in the data', () => {
    const updatedData = _.cloneDeep(data),
      unitStack = '123';
    render(
      <PropertyTableTemplate
        data={{ ...updatedData, unitStack }}
        columnGroups={columnGroups}
        title={title}
      />
    );

    const customTextMatcher = (content, element) => {
      const elementText = element.textContent || element.innerText || "";
      return elementText.includes(content);
    };

    const expectedText = `Unit/Stack/Pipe ID: ${unitStack}`;
    const reportTitle = screen.getByText(new RegExp(expectedText)) // Update this line
    expect(reportTitle).toBeInTheDocument();
  });
});
