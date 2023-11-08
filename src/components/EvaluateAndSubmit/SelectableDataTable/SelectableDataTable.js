import { ArrowDownwardSharp } from "@material-ui/icons";
import DataTable from "react-data-table-component";
import { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./SelectableDataTable.scss";

//Selectable data table that automatically refreshes its data based on the dataFetchCall whenever dataFetchParams are changed
export const SelectableDataTable = ({
  columns,
  providedData = [],
  changedCallback,
  isSelectable,
}) => {
  columns = columns.map((c) => {
    return { ...c, wrap: true };
  });

  //Custom formatting for the USWDS checkbox
  const DataTableCheckbox = forwardRef(({ onClick, ...rest }, ref) => {
    // Generate a unique ID for this checkbox
    const uniqueID = uuidv4();

    return (
      <div className="usa-checkbox checkbox-container">
        <input
          className="usa-checkbox__input"
          id={uniqueID}
          type="checkbox"
          ref={ref}
          onClick={onClick}
          {...rest}
        />
        <label
          className="usa-checkbox__label checkbox-margin"
          htmlFor={uniqueID}
        ></label>
      </div>
    );
  });

  const isRowSelected = (row) => {
    if (row.isSelected) {
      return true;
    }
    return false;
  };

  const isRowDisabled = (row) => {
    if (row.isDisabled) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="grid-col-12">
        <DataTable
          className=" data-display-table-export maxh-mobile overflow-y-scroll fixed-table-header"
          columns={columns}
          data={providedData}
          selectableRowsComponent={DataTableCheckbox}
          selectableRows={isSelectable}
          onSelectedRowsChange={changedCallback}
          selectableRowSelected={isRowSelected}
          selectableRowDisabled={isRowDisabled}
          defaultSortField="orisCode"
          highlightOnHover={true}
          responsive={false}
          persistTableHead={false}
          fixedHeader={true}
          sortIcon={
            <ArrowDownwardSharp
              className="margin-left-2 text-primary"
              id="bdfSortIcon"
            />
          }
          noDataComponent={
            <div aria-live="polite">There are no records to display</div>
          }
        />
      </div>
    </>
  );
};

export default SelectableDataTable;
