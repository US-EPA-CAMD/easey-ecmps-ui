import { Preloader } from "@us-epa-camd/easey-design-system";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";

import { getQATestSummary } from "../../../utils/api/qaCertificationsAPI";
import { qaTestSummaryCols } from "../../../utils/constants/tableColumns"

const ExportTablesContainer = ({
  selectionData,
  selectedConfig,
  exportState,
  setExportState,
  workspaceSection,
}) => {
  const { beginDate: beginDateOption, endDate: endDateOption } = selectionData;
  const { locations } = selectedConfig;
  const [qaTestSummaryData, setQATestSummaryData] = useState(
    exportState.qaTestSummaryRows
  );

  useEffect(() => {
    const fetchQATestSummary = async () => {
      const allPromises = [];
      locations.forEach((e) => {
        allPromises.push(
          getQATestSummary(e.id, beginDateOption, endDateOption)
        );
      });
      Promise.all(allPromises).then((res) => {
        setQATestSummaryData(res.map((e) => e.data).flat());
      });
    };
    fetchQATestSummary();
  }, [beginDateOption, endDateOption]);

  const rows = qaTestSummaryData?.map((obj) => {
    const {
      id,
      unitId,
      stackPipeId,
      componentID,
      testNumber,
      testResultCode,
      beginDate,
      beginHour,
      endDate,
      endHour,
    } = obj;
    return {
      id,
      unitId,
      stackPipeId,
      componentID,
      testNumber,
      testResultCode,
      beginDate,
      beginHour,
      endDate,
      endHour,
    };
  });

  const onSelectRowsHandler = ({
    _allSelected,
    _selectedCount,
    selectedRows,
  }) => {
    const selectedIds = selectedRows.map((row) => row.id);
    setExportState(
      selectedConfig.id,
      {
        ...exportState,
        selectedIds,
        qaTestSummaryRows: rows,
      },
      workspaceSection
    );
  };

  const selectableRowSelectedHandler = (row) => {
    return exportState?.selectedIds?.includes(row.id);
  };

  const dataTable = (
    <div className="margin-x-3 margin-y-4">
      <h3 className="margin-y-1">Test Summary</h3>
      <DataTable
        responsive={true}
        fixedHeader={true}
        noHeader={true}
        striped={false}
        highlightOnHover={true}
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
        columns={qaTestSummaryCols}
        data={rows}
        selectableRows
        onSelectedRowsChange={onSelectRowsHandler}
        selectableRowSelected={selectableRowSelectedHandler}
      />
    </div>
  );

  const tableContent = qaTestSummaryData ? dataTable : <Preloader />;

  return <>{tableContent}</>;
};

export default ExportTablesContainer;
