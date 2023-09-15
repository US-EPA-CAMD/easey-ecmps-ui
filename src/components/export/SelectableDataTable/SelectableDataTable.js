import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./SelectableDataTable.scss";

//Selectable data table that automatically refreshes its data based on the dataFetchCall whenever dataFetchParams are changed
export const SelectableDataTable = ({
  columns,
  providedData = [],
  dataFetchCall = null,
  dataFetchParams = null,
  changedCallback,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(providedData);

  columns = columns.map((c) => {
    return { ...c, wrap: true };
  });

  //Automatically refresh data using the dataFetchCall with the dataFetchParams, whenever the dataFetchParams are changed
  const refreshData = async () => {
    if (dataFetchCall && dataFetchParams) {
      setLoading(true);
      const refreshedData = await dataFetchCall(...dataFetchParams);
      setData(refreshedData.data);
    }
    setLoading(false);
  };

  //Handle data refresh on search parameter changes
  useEffect(() => {
    refreshData();
  }, [dataFetchParams]);

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

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <div className="data-display-table-export fixed-table-header grid-col-12">
          <DataTable
            columns={columns}
            data={data}
            selectableRowsComponent={DataTableCheckbox}
            selectableRows
            onSelectedRowsChange={changedCallback}
          />
        </div>
      )}
    </>
  );
};

export default SelectableDataTable;
