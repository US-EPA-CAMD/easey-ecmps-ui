import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import download from "downloadjs";
import { Button } from "@trussworks/react-uswds";
import { v4 as uuidv4 } from "uuid";
import { Preloader } from "@us-epa-camd/easey-design-system";

import ReportingPeriodSelector from "../../ReportingPeriodSelector/ReportingPeriodSelector";
import { ExportTable } from "../ExportTable/ExportTable";
import {
  monPlanColumns,
  qaTestSummaryColumns,
  qaCertEventColumns,
  qaTeeColumns,
  emissionsColumns,
} from "../../EvaluateAndSubmit/ColumnMappings";
import {
  getQATestSummaryReviewSubmit,
  getQACertEventReviewSubmit,
  getQATeeReviewSubmit,
  exportQA,
} from "../../../utils/api/qaCertificationsAPI";
import {
  getEmissionsReviewSubmit,
  exportEmissionsDataDownload,
} from "../../../utils/api/emissionsApi";
import {
  getMonitoringPlans,
  exportMonitoringPlanDownload,
} from "../../../utils/api/monitoringPlansApi";
import { getUser } from "../../../utils/functions";
import UploadModal from "../../UploadModal/UploadModal";
import { useDispatch, useSelector } from "react-redux";
import { setExportState } from "../../../store/actions/dynamicFacilityTab";

export const ExportTab = ({
  facility,
  selectedConfig,
  orisCode,
  workspaceSection,
}) => {
  const [canExport, setCanExport] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [reportingPeriod, setReportingPeriod] = useState("");
  const [tableData, setTableData] = useState([]);

  const storedYear = useRef();
  const storedQuarter = useRef();

  const exportState = useSelector((state) => {
    const exportTabs = state.openedFacilityTabs.export;
    const curTabObj = exportTabs.find(
      (tab) => tab.selectedConfig.id === selectedConfig.id
    );
    return curTabObj?.exportState ?? null;
  });

  const dispatch = useDispatch();

  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");

  const selectedUnits = selectedConfig.monitoringLocationData
    .filter((ml) => ml.unitId)
    .map((data) => data.unitId);
  const selectedStacks = selectedConfig.monitoringLocationData
    .filter((ml) => ml.stackPipeId)
    .map((data) => data.stackPipeId);

  const dataTypes = [
    {
      title: "Monitor Plan",
      columns: monPlanColumns,
      dataFetch: getMonitoringPlans,
      selectedRows: useRef([]),
      reportCode: "MPP",
      uniqueIdField: "id",
    },
    {
      title: "Test Data",
      columns: qaTestSummaryColumns,
      dataFetch: getQATestSummaryReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "TEST_DETAIL",
      uniqueIdField: "testSumId",
    },
    {
      title: "QA Certification Events",
      columns: qaCertEventColumns,
      dataFetch: getQACertEventReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "QCE",
      uniqueIdField: "qaCertEventIdentifier",
    },
    {
      title: "Test Extension Exemptions Data",
      columns: qaTeeColumns,
      dataFetch: getQATeeReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "TEE",
      uniqueIdField: "testExtensionExemptionIdentifier",
    },

    {
      title: "Emissions",
      columns: emissionsColumns,
      dataFetch: getEmissionsReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "EM",
      uniqueIdField: "submissionId",
    },
  ];

  useEffect(() => {
    const fetchTableData = async () => {
      const promises = dataTypes.map((dt) =>
        dt.dataFetch([orisCode], [selectedConfig.id], [reportingPeriod])
      );
      const responses = await Promise.all(promises);

      const tableData = responses.map((resp) => resp.data);
      setTableData(tableData);
    };
    fetchTableData();
    // causes inf rerender: dataTypes (dataTypes is not a primitive)
  }, [reportingPeriod, orisCode, selectedConfig.id]);

  const reportingPeriodSelectionHandler = (selectedObj) => {
    const { id, calendarYear, quarter } = selectedObj;
    setReportingPeriod(`${calendarYear} Q${quarter}`);

    storedYear.current = calendarYear;
    storedQuarter.current = quarter;

    const newExportState = {
      ...exportState,
      reportingPeriodId: id,
    };

    dispatch(
      setExportState(selectedConfig.id, newExportState, workspaceSection)
    );
  };

  const getInitSelection = (reportingPeriodObj) => {
    const { calendarYear, quarter } = reportingPeriodObj;
    setReportingPeriod(`${calendarYear} Q${quarter}`);
    storedYear.current = calendarYear;
    storedQuarter.current = quarter;
  };

  const downloadQaData = async () => {
    const exportJson = await exportQA(
      selectedConfig.orisCode,
      selectedUnits,
      selectedStacks,
      null,
      null,
      { isOfficial: !getUser(), isHistoricalImport: false },
      dataTypes[1].selectedRows.current.map((d) => d.testSumId),
      dataTypes[2].selectedRows.current.map((d) => d.qaCertEventIdentifier),
      dataTypes[3].selectedRows.current.map(
        (d) => d.testExtensionExemptionIdentifier
      )
    );

    download(
      JSON.stringify(exportJson.data, null, "\t"),
      `QA & Certification | Export - ${facilityMainName}.json`
    );
  };

  const exportClickHandler = async () => {
    let selectedItems = 0;
    for (const section of dataTypes) {
      selectedItems += section.selectedRows.current.length;
    }

    if (selectedItems <= 0) {
      return;
    }

    setIsExporting(true);
    const promises = [];

    // export monitoring plan
    if (dataTypes[0].selectedRows.current.length > 0) {
      promises.push(exportMonitoringPlanDownload(selectedConfig.id));
    }

    //export qa
    if (
      dataTypes[1].selectedRows.current.length > 0 ||
      dataTypes[2].selectedRows.current.length > 0 ||
      dataTypes[3].selectedRows.current.length > 0
    ) {
      promises.push(downloadQaData());
    }

    // export emissions
    if (dataTypes[4].selectedRows.current.length > 0) {
      promises.push(
        exportEmissionsDataDownload(
          facility,
          selectedConfig.id,
          storedYear.current,
          storedQuarter.current,
          getUser() !== null
        )
      );
    }

    await Promise.all(promises);
    setIsExporting(false);
  };

  const dispatchSetExportState = (newExportState) => {
    dispatch(
      setExportState(selectedConfig.id, newExportState, workspaceSection)
    );
  };

  const canToggleExport = useCallback(() => {
    let selectedItems = 0;
    for (const dataChunk of dataTypes) {
      selectedItems += dataChunk.selectedRows.current.length;
    }

    setCanExport(selectedItems > 0);
  }, []);

  return (
    <div>
      <div className="border-bottom-1px border-base-lighter padding-bottom-2">
        <div className="grid-row">
          <h3 className="grid-col-3">
            <span className="font-body-lg">{facilityMainName}</span>
            <span className="text-bold font-body-xl display-block">
              {facilityAdditionalName}
            </span>
          </h3>
          <div className="grid-col-6 padding-left-5 margin-y-auto">
            <ReportingPeriodSelector
              isExport={true}
              dataTypes={dataTypes.filter((e) => e.checked)}
              reportingPeriodSelectionHandler={reportingPeriodSelectionHandler}
              exportState={exportState}
              getInitSelection={getInitSelection}
              isQaCert={true}
            />
          </div>
          <center className="grid-col-3 margin-y-auto =">
            <Button
              disabled={!canExport}
              type={"button"}
              size="big"
              className="width-full maxw-card-lg"
              onClick={exportClickHandler}
            >
              Export
            </Button>
          </center>
        </div>
      </div>

      <div className="border-bottom-1px border-base-lighter padding-bottom-2">
        {dataTypes.map((dt, index) => {
          return (
            <ExportTable
              toggleExportCallback={canToggleExport}
              key={dt.uniqueIdField}
              title={dt.title}
              columns={dt.columns}
              providedData={tableData[index]}
              selectedDataRef={dt.selectedRows}
              reportCode={dt.reportCode}
              exportState={exportState}
              dispatchSetExportState={dispatchSetExportState}
              uniqueIdField={dt.uniqueIdField}
            />
          );
        })}
      </div>

      <div className="grid-row">
        <center className="grid-col-3 grid-offset-9 margin-y-auto padding-top-2">
          <Button
            disabled={!canExport}
            type={"button"}
            size="big"
            className="width-full maxw-card-lg"
            onClick={exportClickHandler}
          >
            Export
          </Button>
        </center>
      </div>

      {isExporting && (
        <UploadModal
          width={"30%"}
          left={"35%"}
          children={<Preloader />}
          preloader
        />
      )}
    </div>
  );
};

export default ExportTab;
