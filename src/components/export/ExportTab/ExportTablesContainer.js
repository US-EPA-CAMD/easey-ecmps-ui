import { Preloader } from "@us-epa-camd/easey-design-system";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";

import {
  exportQA,
  getQATestSummary,
} from "../../../utils/api/qaCertificationsAPI";
import { getUnitIdAndStackPipeIds } from "../../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview";
import { qaTestSummaryCols } from "../../../utils/constants/tableColumns";

const ExportTablesContainer = ({
  selectionData,
  selectedConfig,
  exportState,
  setExportState,
  workspaceSection,
  orisCode,
}) => {
  const { beginDate, endDate } = selectionData;
  const { locations } = selectedConfig;
  const [qaTestSummaryData, setQATestSummaryData] = useState(
    exportState.qaTestSummaryRows
  );
  const [loading, setLoading] = useState(false);
  const fetchQATestSummary = async () => {
    setLoading(true);
    const unitIdsAndStackPipeIds = getUnitIdAndStackPipeIds(locations);
    try {
      const unitIds = unitIdsAndStackPipeIds.unitIds;
      const stackPipeIds = unitIdsAndStackPipeIds.stackPipeIds;
      const response = await exportQA({
        orisCode,
        unitIds,
        stackPipeIds,
        beginDate,
        endDate,
      });
      if (response) {
        console.log("response", response.data);
        setQATestSummaryData(response.data.testSummaryData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQATestSummary();
  }, [beginDate, endDate]);

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
        qaTestSummaryRows: qaTestSummaryData,
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
        data={qaTestSummaryData}
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
