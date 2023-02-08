import React from 'react';
import { render } from '@testing-library/react';
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
    const {getByText } = render(
      <PropertyTableTemplate
        data={data}
        columnGroups={columnGroups}
        title={title}
      />
    );
    const reportTitle = getByText(title)
    expect(reportTitle).toBeInTheDocument();
  });

  it('displays unit stack id in title if there is unitStack id in the data', () => {
    const updatedData = _.cloneDeep(data), unitStack = '123';
    const {debug, getByText } = render(
      <PropertyTableTemplate
        data={{...updatedData, unitStack}}
        columnGroups={columnGroups}
        title={title}
      />
    );
    const reportTitle = getByText(`Unit/Stack/Pipe ID: ${unitStack} - ${title}`)
    expect(reportTitle).toBeInTheDocument();
  });
});
