import React, { useRef, useState } from "react";
import download from "downloadjs";
import { Button } from "@trussworks/react-uswds";

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
import { getEmissionsReviewSubmit } from "../../../utils/api/emissionsApi";

import { getMonitoringPlans } from "../../../utils/api/monitoringPlansApi";

import { Preloader } from "@us-epa-camd/easey-design-system";
import { exportMonitoringPlanDownload } from "../../../utils/api/monitoringPlansApi";
import { exportEmissionsDataDownload } from "../../../utils/api/emissionsApi";
import { getUser } from "../../../utils/functions";
import UploadModal from "../../UploadModal/UploadModal";
import { v4 as uuidv4 } from "uuid";

export const ExportTab = ({
  facility,
  selectedConfig,
  orisCode,
  exportState,
  setExportState,
  workspaceSection,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [reportingPeriod, setReportingPeriod] = useState("");

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
    },
    {
      title: "Test Data",
      columns: qaTestSummaryColumns,
      dataFetch: getQATestSummaryReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "TEST_DETAIL",
    },
    {
      title: "QA Certification Events",
      columns: qaCertEventColumns,
      dataFetch: getQACertEventReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "QCE",
    },
    {
      title: "Test Extension Exemptions Data",
      columns: qaTeeColumns,
      dataFetch: getQATeeReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "TEE",
    },
    {
      title: "Emissions",
      columns: emissionsColumns,
      dataFetch: getEmissionsReviewSubmit,
      selectedRows: useRef([]),
      reportCode: "EM",
    },
  ];

  const reportingPeriodSelectionHandler = (selectedObj) => {
    const { calendarYear, quarter } = selectedObj;
    setReportingPeriod(`${calendarYear} Q${quarter}`);
  };

  const getInitSelection = (reportingPeriodObj) => {
    const { calendarYear, quarter } = reportingPeriodObj;
    setReportingPeriod(`${calendarYear} Q${quarter}`);
  };

  const downloadQaData = async () => {
    const exportJson = await exportQA(
      selectedConfig.orisCode,
      selectedUnits,
      selectedStacks,
      null,
      null,
      { isOfficial: getUser() !== null, isHistoricalImport: false },
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
          dataTypes[4].selectedRows.current.calendarYear,
          dataTypes[4].selectedRows.current.quarter,
          getUser() !== null
        )
      );
    }

    await Promise.all(promises);
    setIsExporting(false);
  };

  return (
    <div>
      {console.log("Rerendering")}
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
        {dataTypes.map((dt) => {
          return (
            <ExportTable
              key={uuidv4}
              title={dt.title}
              columns={dt.columns}
              dataFetchCall={dt.dataFetch}
              dataFetchParams={[
                [orisCode],
                [selectedConfig.id],
                [reportingPeriod],
              ]}
              selectedDataRef={dt.selectedRows}
              reportCode={dt.reportCode}
            />
          );
        })}
      </div>

      <div className="grid-row">
        <center className="grid-col-3 grid-offset-9 margin-y-auto padding-top-2">
          <Button
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
