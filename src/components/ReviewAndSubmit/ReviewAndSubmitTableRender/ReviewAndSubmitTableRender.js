import { ArrowDownwardSharp, LockSharp } from '@material-ui/icons';
import { Button, Checkbox } from '@trussworks/react-uswds';
import React from 'react';
import DataTable from 'react-data-table-component';
import { isLocationCheckedOut, isUserDataSubmitter } from '../MockPermissions';

const ReviewAndSubmitTableRender = ({
  columns,
  data,
  dataTableName,
  dataTableProps,
}) => {
  if (columns) {
    columns.unshift({
      cell: (dataRowObject) => addCheckboxOrLock(dataRowObject),
    });
  }
  const addCheckboxOrLock = (row) => {
    // const { row } = dataRowObject;
    console.log({row});
    if (isLocationCheckedOut()) {
      return (
        <LockSharp
          className="row-lock margin-right-1"
          aria-hidden="false"
          title={`Locked Facility - ${row.facilityName}`}
          role="img"
        />
      );
    } 
    else if (isUserDataSubmitter(row, dataTableName)) {
      return <Checkbox />;
    } 
    else {
      return (
        <Button
          type="button"
          unstyled="true"
          epa-testid="btnOpen"
          className="cursor-pointer margin-left-2 open-modal-button"
          onClick={() => {}}
          aria-label={`View ${row.facilityName}`}
        >
          {'View'}
        </Button>
      );
    }
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        noHeader={true}
        highlightOnHover={true}
        responsive={false}
        persistTableHead={false}
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
