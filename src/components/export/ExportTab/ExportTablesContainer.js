import { Preloader } from "@us-epa-camd/easey-design-system";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";

import { exportQA } from "../../../utils/api/qaCertificationsAPI";
import { getUnitIdAndStackPipeIds } from "../../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview";
import { addScreenReaderLabelForCollapses, assignAriaLabelsToDataTable, ensure508 } from "../../../additional-functions/ensure-508";
import { getExportTableCols } from "../../../utils/selectors/QACert/assert-export";
import { oneSecond } from "../../../config";
import { getUser } from "../../../utils/functions";
import { successResponses } from "../../../utils/api/apiUtils";

import "./ExportTablesContainer.scss";

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
    setTimeout(() => {
      ensure508(divId);
    }, oneSecond);

    return () => {
      addScreenReaderLabelForCollapses();

    };
  }, [tableData]);

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
            isOfficial: !getUser(),
            isHistoricalImport: false,
          }
        );
        if (successResponses.includes(response.status)) {
          // add dataKey so selectedRow can be differentiated when exported
          const tableRows = response.data[dataKey].map(data => ({ ...data, dataKey }))
          setTableData(tableRows);
          setLoading(false);

          const rowsAriaLabelData = response.data[dataKey].map(e => e.stackPipeId? e.stackPipeId : e.unitId)
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
        className="data-display-table maxh-mobile overflow-y-scroll fixed-table-header"
        responsive={true}
        noHeader={true}
        striped={false}
        highlightOnHover={true}
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
        columns={getExportTableCols(tableTitle)}
        data={tableData}
        selectableRows
        onSelectedRowsChange={onSelectRowsHandler}
        selectableRowSelected={selectableRowSelectedHandler}
        noDataComponent={<div aria-live="polite">There are no records to display</div>}
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
