import { Preloader } from "@us-epa-camd/easey-design-system";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ArrowDownwardSharp } from "@material-ui/icons";

import { getQATestSummary } from "../../../utils/api/qaCertificationsAPI";
import { Button } from "@trussworks/react-uswds";

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
      componentID: componentId,
      testNumber,
      testResultCode,
      beginDate,
      beginHour,
      endDate,
      endHour,
    } = obj;
    return {
      id,
      componentId,
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

const qaTestSummaryCols = [
  {
    name: "Unit or Stack Pipe ID",
    selector: (row) => row.unitOrStackPipeId,
  },
  {
    name: "Component ID",
    selector: (row) => row.componentId,
  },
  {
    name: "Test Number",
    selector: (row) => row.testNumber,
  },
  {
    name: "Test Result Code",
    selector: (row) => row.testResultCode,
  },
  {
    name: "Begin Date",
    selector: (row) => row.beginDate,
  },
  {
    name: "Begin Hour",
    selector: (row) => row.beginHour,
  },
  {
    name: "End Date",
    selector: (row) => row.endDate,
  },
  {
    name: "End Hour",
    selector: (row) => row.endHour,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];
