import React, { useState } from "react";
import ReportingPeriodSelector from "../../ReportingPeriodSelector/ReportingPeriodSelector";
import { Button, Checkbox } from "@trussworks/react-uswds";
import ExportTablesContainer from "./ExportTablesContainer";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { exportQA } from "../../../utils/api/qaCertificationsAPI";

const ExportTab = ({
  facility,
  selectedConfig,
  orisCode,
  exportState,
  setExportState,
  workspaceSection,
}) => {
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
        checkedDataTypes: dataTypesCopy
          .filter((f) => f.checked)
          .map((e) => e.name),
        reportingPeriodId: reportingPeriod.id,
      },
      workspaceSection
    );
  };

  const reportingPeroidSelectionHandler = (selectedObj) => {
    const { id, beginDate, endDate } = selectedObj;
    setReportingPeriod({ id, beginDate, endDate });
    setExportState(
      selectedConfig.id,
      {
        checkedDataTypes: dataTypes.filter((e) => e.checked).map((e) => e.name),
        reportingPeriodId: selectedObj.id,
      },
      workspaceSection
    );
  };
  const getInitSelection = (reportingPeriodObj) => {
    const { id, beginDate, endDate } = reportingPeriodObj;
    setReportingPeriod({ id, beginDate, endDate });
    if (exportState) {
      setPreviewOptions({ beginDate, endDate });
    }
  };

  const exportClickHandler = async () => {
    console.log('export clicked')
    // get facilityId, unitIds, stackPipeIds, begin/end date
    console.log('facility', facility);
    console.log('selectedConfig', selectedConfig);
    console.log('exportState', exportState);

    const selectedRows = exportState.qaTestSummaryRows.filter(row => {
      return exportState.selectedIds.includes(row.id)
    })

    const facilityId = selectedConfig.facId

    let unitIds = selectedRows.filter(row => row.unitId).map(row => row.unitId)
    unitIds = [...new Set(unitIds)]

    let stackPipeIds = selectedRows.filter(row => row.stackPipeId).map(row => row.stackPipeId)
    stackPipeIds = [...new Set(stackPipeIds)]

    const { beginDate, endDate } = previewOptions

    const result = await exportQA({ facilityId, unitIds, stackPipeIds, beginDate, endDate })
    console.log('result exportQA', result);
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
              reportingPeroidSelectionHandler={reportingPeroidSelectionHandler}
              exportState={exportState}
              setLoading={setLoading}
              getInitSelection={getInitSelection}
            />
          </div>
          <div className="grid-col-3 padding-left-8 padding-top-3">
            <Button
              className="width-card"
              disabled={
                dataTypes.filter((e) => e.checked).length === 0 ||
                (dataTypes.filter((e) => e.checked).length === 1 &&
                  dataTypes.find((e) => e.name === mp).checked)
              }
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
          <ExportTablesContainer
            selectionData={previewOptions}
            selectedConfig={selectedConfig}
            exportState={exportState}
            setExportState={setExportState}
            workspaceSection={workspaceSection}
          />
        )}
        <div className="border-top-1px border-base-lighter padding-y-2">
          <Button
            className="float-right margin-top-3"
            disabled={
              !dataTypes.find((e) => e.name === "monitoring-plan").checked
            }
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
