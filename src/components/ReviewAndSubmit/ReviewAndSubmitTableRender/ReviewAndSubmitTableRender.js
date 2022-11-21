import { ArrowDownwardSharp } from '@material-ui/icons';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {
  addScreenReaderLabelForCollapses,
  cleanUp508,
  ensure508,
} from '../../../additional-functions/ensure-508';
import { oneSecond } from '../../../config';

const ReviewAndSubmitTableRender = ({ columns, data, dataTableProps }) => {
  useEffect(() => {
    setTimeout(() => {
      ensure508();
    }, oneSecond);

    return () => {
      cleanUp508();
      addScreenReaderLabelForCollapses();
    };
  }, []);

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        noHeader={true}
        highlightOnHover={true}
        responsive={false}
        persistTableHead={false}
        selectableRows={true}
        sortIcon={
          <ArrowDownwardSharp
            className="margin-left-2 text-primary"
            id="bdfSortIcon"
          />
        }
        {...dataTableProps}
      />
    </div>
  );
};

export default ReviewAndSubmitTableRender;
