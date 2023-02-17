import { Preloader } from "@us-epa-camd/easey-design-system";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";

import { exportQA } from "../../../utils/api/qaCertificationsAPI";
import { getUnitIdAndStackPipeIds } from "../../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview";
import { assignAriaLabelsToDataTable } from "../../../additional-functions/ensure-508";
import { getExportTableCols } from "../../../utils/selectors/QACert/assert-export";

export const ExportTablesContainer = ({
  selectionData,
  selectedConfig,
  exportState,
  setExportState,
  workspaceSection,
  orisCode,
  dataRef,
  tableTitle,
  dataKey,
}) => {
  const { beginDate, endDate } = selectionData;
  const { locations } = selectedConfig;
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);

  const divId = `export-${dataKey}`

  useEffect(() => {
    const fetchTableData = async () => {
      setLoading(true);
      const { unitIds, stackPipeIds } = getUnitIdAndStackPipeIds(locations);
      try {
        const response = await exportQA(
          orisCode,
          unitIds,
          stackPipeIds,
          beginDate,
          endDate,
          {
            isOfficial: true,
            isHistoricalImport: false,
          }
        );
        if (response) {
          // add dataKey so selectedRow can be differentiated when exported
          const tableRows = response.data[dataKey].map(data => ({ ...data, dataKey }))
          setTableData(tableRows);
          setLoading(false);

          const rowsAriaLabelData = []
          response.data[dataKey].forEach(e => rowsAriaLabelData.push(e.id));
          assignAriaLabelsToDataTable(`#${divId}`, rowsAriaLabelData)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTableData();
  }, [beginDate, dataKey, divId, endDate, locations, orisCode]);

  const onSelectRowsHandler = ({
    selectedRows,
  }) => {
    // group selectedRows by dataKey: testSummary, qaCert, tee
    dataRef.current = {
      ...dataRef.current,
      [dataKey]: selectedRows
    }
    const prevSelectedIds = exportState.selectedIds ?? {}
    const selectedIds = {
      ...prevSelectedIds,
      [dataKey]: selectedRows.map(row => row.id)
    }
    setExportState(
      selectedConfig.id,
      {
        ...exportState,
        selectedIds,
      },
      workspaceSection
    );
  };

  const selectableRowSelectedHandler = (row) => {
    const allLists = Object.values(exportState?.selectedIds ?? [])
    const allSelectedIds = [].concat(...allLists);
    return allSelectedIds.includes(row.id);
  };

  const dataTable = (
    <div className="margin-x-3 margin-y-4" id={divId}>
      <h4 className="margin-y-1">{tableTitle}</h4>
      <DataTable
        className="data-display-table"
        responsive={true}
        fixedHeader={true}
        noHeader={true}
        striped={false}
        highlightOnHover={true}
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
        columns={getExportTableCols(tableTitle)}
        data={tableData}
        selectableRows
        onSelectedRowsChange={onSelectRowsHandler}
        selectableRowSelected={selectableRowSelectedHandler}
      />
    </div>
  );

  return (
    <>
      {loading && <Preloader />}
      {!loading && dataTable}
    </>
  );
};

export default ExportTablesContainer;
