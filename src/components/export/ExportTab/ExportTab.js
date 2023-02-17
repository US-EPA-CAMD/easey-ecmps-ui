import React, { useRef, useState } from "react";
import download from "downloadjs";
import { Button, Checkbox } from "@trussworks/react-uswds";

import ReportingPeriodSelector from "../../ReportingPeriodSelector/ReportingPeriodSelector";

import ExportTablesContainer from "./ExportTablesContainer";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { exportMonitoringPlanDownload } from "../../../utils/api/monitoringPlansApi";
import { exportEmissionsDataDownload } from "../../../utils/api/emissionsApi";
import { getUser } from "../../../utils/functions";

export const ExportTab = ({
  facility,
  selectedConfig,
  orisCode,
  exportState,
  setExportState,
  workspaceSection,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");

  const mp = "monitoring-plan";
  const qa = "qa-and-certification";
  const em = "emissions";

  const [dataTypes, setDataTypes] = useState([
    {
      label: "Monitoring Plan",
      name: mp,
      checked: exportState ? exportState.checkedDataTypes.includes(mp) : false,
    },
    {
      label: "QA & Certification",
      name: qa,
      checked: exportState ? exportState.checkedDataTypes.includes(qa) : false,
    },
    {
      label: "Emissions",
      name: em,
      checked: exportState ? exportState.checkedDataTypes.includes(em) : false,
    },
  ]);
  const [reportingPeriod, setReportingPeriod] = useState(null);
  const [previewOptions, setPreviewOptions] = useState();
  const [loading, setLoading] = useState(false);

  const rowsData = useRef();

  const dataTypeSelectionHanlder = (e) => {
    const dataTypesCopy = [...dataTypes];
    const index = dataTypesCopy.findIndex((d) => d.name === e.target.name);
    if (index > -1) {
      dataTypesCopy[index].checked = e.target.checked;
      setDataTypes(dataTypesCopy);
    }
    setExportState(
      selectedConfig.id,
      {
        ...exportState,
        checkedDataTypes: dataTypesCopy
          .filter((f) => f.checked)
          .map((e) => e.name),
        reportingPeriodId: reportingPeriod.id,
      },
      workspaceSection
    );
  };

  const reportingPeriodSelectionHandler = (selectedObj) => {
    const { id, beginDate, calendarYear, endDate, quarter } = selectedObj;
    setReportingPeriod({ id, beginDate, calendarYear, endDate, quarter });
    setExportState(
      selectedConfig.id,
      {
        ...exportState,
        checkedDataTypes: dataTypes.filter((e) => e.checked).map((e) => e.name),
        reportingPeriodId: selectedObj.id,
      },
      workspaceSection
    );
  };

  const getInitSelection = (reportingPeriodObj) => {
    const { id, beginDate, calendarYear, endDate, quarter } =
      reportingPeriodObj;
    setReportingPeriod({ id, beginDate, calendarYear, endDate, quarter });
    if (exportState) {
      setPreviewOptions({ beginDate, endDate });
    }
  };

  const exportClickHandler = async () => {
    setIsExporting(true);
    let exportFileName;
    const promises = [];

    // export monitoring plan
    if (dataTypes.find((e) => e.name === mp).checked) {
      promises.push(exportMonitoringPlanDownload(selectedConfig.id));
    }
    // export qa
    if (dataTypes.find((e) => e.name === qa).checked) {
      exportFileName = `QA & Certification | Export - ${facility}.json`;
      const selectedRows = rowsData.current;
      const exportJson = {
        orisCode: orisCode,
        ...selectedRows,
      };
      download(JSON.stringify(exportJson, null, "\t"), exportFileName);
    }

    // export emissions
    if (dataTypes.find((e) => e.name === em).checked) {
      promises.push(
        exportEmissionsDataDownload(
          facility,
          selectedConfig.id,
          reportingPeriod.calendarYear,
          reportingPeriod.quarter,
          getUser() !== null
        )
      );
    }

    await Promise.all(promises);
    setIsExporting(false);
  };

  const isExportDisabled = () => {
    const isMonitoringPlanChecked = dataTypes.find(
      (e) => e.name === mp
    ).checked;
    const isEmissionsChecked = dataTypes.find((dataType) => {
      return dataType.name === em;
    }).checked;

    const rowsHasSelected = () => {
      if (!exportState?.selectedIds) {
        return false;
      }
      for (const listOfSelected of Object.values(exportState?.selectedIds)) {
        if (listOfSelected.length > 0) {
          return true;
        }
      }
      return false;
    }

    return (
      isExporting ||
      (!isMonitoringPlanChecked && !isEmissionsChecked && !rowsHasSelected())
    );
  };

  const isPreviewDisabled = () => {
    const checkedDataTypes = dataTypes.filter(e => e.checked);
    // if only qa is checked
    return !(checkedDataTypes.length === 1 && checkedDataTypes[0].name === qa);
  }

  return (
    <>
      {loading ? <Preloader /> : null}
      <div className="margin-x-3 grid-container">
        <div className="border-bottom-1px border-base-lighter padding-bottom-2">
          <div className="grid-row">
            <h3 className="display-inline-block">
              <span className="font-body-lg">{facilityMainName}</span>
            </h3>{" "}
          </div>
          <div className=" grid-row text-bold font-body-xl display-block">
            {facilityAdditionalName}
          </div>
        </div>
        <div className="grid-row margin-y-3">
          <div className="grid-col-3">
            {dataTypes.map((d, i) => (
              <Checkbox
                id={d.name}
                name={d.name}
                label={<strong>{d.label}</strong>}
                checked={d.checked}
                onChange={dataTypeSelectionHanlder}
                key={i}
              />
            ))}
          </div>
          <div className="grid-col-6">
            <ReportingPeriodSelector
              isExport={true}
              dataTypes={dataTypes.filter((e) => e.checked)}
              reportingPeriodSelectionHandler={reportingPeriodSelectionHandler}
              exportState={exportState}
              setLoading={setLoading}
              getInitSelection={getInitSelection}
            />
          </div>
          <div className="grid-col-3 padding-left-8 padding-top-3">
            <Button
              type={"button"}
              className="width-card"
              disabled={isPreviewDisabled()}
              onClick={() =>
                setPreviewOptions({
                  beginDate: reportingPeriod.beginDate,
                  endDate: reportingPeriod.endDate,
                })
              }
            >
              Preview
            </Button>
          </div>
        </div>
        {previewOptions && (
          <>
            <ExportTablesContainer
              tableTitle={'Test Summary'}
              dataKey={'testSummaryData'}
              selectionData={previewOptions}
              selectedConfig={selectedConfig}
              exportState={exportState}
              setExportState={setExportState}
              workspaceSection={workspaceSection}
              orisCode={orisCode}
              dataRef={rowsData}
            />
            <ExportTablesContainer
              tableTitle={'QA Certification Events'}
              dataKey={'certificationEventData'}
              selectionData={previewOptions}
              selectedConfig={selectedConfig}
              exportState={exportState}
              setExportState={setExportState}
              workspaceSection={workspaceSection}
              orisCode={orisCode}
              dataRef={rowsData}
            />
            <ExportTablesContainer
              tableTitle={'Test Extension Exemptions'}
              dataKey={'testExtensionExemptionData'}
              selectionData={previewOptions}
              selectedConfig={selectedConfig}
              exportState={exportState}
              setExportState={setExportState}
              workspaceSection={workspaceSection}
              orisCode={orisCode}
              dataRef={rowsData}
            />
          </>

        )}
        <div className="border-top-1px border-base-lighter padding-y-2">
          <Button
            type={"button"}
            className="float-right margin-top-3"
            disabled={isExportDisabled()}
            onClick={exportClickHandler}
          >
            Export
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExportTab;
