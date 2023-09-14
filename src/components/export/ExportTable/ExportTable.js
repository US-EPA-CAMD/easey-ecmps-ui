import { Button } from "@trussworks/react-uswds";
import { useState } from "react";
import SelectableDataTable from "../SelectableDataTable/SelectableDataTable";

//Selectable data table that automatically refreshes its data based on the dataFetchCall whenever dataFetchParams are changed
export const ExportTable = ({
  title,
  columns,
  dataFetchCall,
  dataFetchParams,
  selectedDataRef,
}) => {
  const [hasSelected, setHasSelected] = useState(false);

  const handleSelectionChange = (rows) => {
    setHasSelected(rows.selectedRows.length > 0);
    selectedDataRef.current = rows.selectedRows;
  };

  return (
    <div className="grid-row">
      <h2 className="grid-col-9"> {title} </h2>
      <div className="grid-col-3 margin-y-auto">
        <Button disabled={!hasSelected}>View Print-out Report</Button>
      </div>
      <SelectableDataTable
        columns={columns}
        dataFetchCall={dataFetchCall}
        dataFetchParams={dataFetchParams}
        changedCallback={handleSelectionChange}
      ></SelectableDataTable>
    </div>
  );
};

export default ExportTable;
