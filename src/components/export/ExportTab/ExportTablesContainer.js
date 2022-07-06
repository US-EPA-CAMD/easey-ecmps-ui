import { Preloader } from "@us-epa-camd/easey-design-system";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";

import { exportQA } from "../../../utils/api/qaCertificationsAPI";
import { qaTestSummaryCols } from "../../../utils/constants/tableColumns";
import { getUnitIdAndStackPipeIds } from "../../QAImportHistoricalDataPreview/QAImportHistoricalDataPreview";

const ExportTablesContainer = ({
  selectionData,
  selectedConfig,
  exportState,
  setExportState,
  workspaceSection,
  orisCode,
  dataRef,
}) => {
  const { beginDate, endDate } = selectionData;
  const { locations } = selectedConfig;
  const [qaTestSummaryData, setQATestSummaryData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQATestSummary = async () => {
      setLoading(true);
      const { unitIds, stackPipeIds } = getUnitIdAndStackPipeIds(locations);
      try {
        const response = await exportQA(
          orisCode,
          unitIds,
          stackPipeIds,
          beginDate,
          endDate
        );
        if (response) {
          setQATestSummaryData(response.data.testSummaryData);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchQATestSummary();
  }, [beginDate, endDate, locations, orisCode]);

  const onSelectRowsHandler = ({
    _allSelected,
    _selectedCount,
    selectedRows,
  }) => {
    dataRef.current = selectedRows;
    const selectedIds = {
      testSummary: selectedRows.map((row) => row.id)
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
    return exportState?.selectedIds?.testSummary?.includes(row.id);
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
