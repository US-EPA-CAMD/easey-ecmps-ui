import React from 'react';
import { render } from '@testing-library/react';

import ReviewAndSubmitTableRender from './ReviewAndSubmitTableRender';
import { monPlansData } from '../ReviewAndSubmitTables/ReviewAndSubmitTables.test';
import { monPlanColumns } from '../ReviewAndSubmitTables/ReviewAndSubmitTables';

describe('Review and Submit Table Renderer component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <ReviewAndSubmitTableRender
        data={monPlansData}
        columns={monPlanColumns}
      />
    );
  });

  test.each(monPlanColumns)('renders columns properly', (column) => {
    const { getByText } = query;
    const columnTitle = getByText(column.name);
    expect(columnTitle).toBeInTheDocument();
  });
});
