import React, { useState } from "react";
import ReportingPeriodSelector from "../../ReportingPeriodSelector/ReportingPeriodSelector";
import { Checkbox, Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";

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
  const [reportingPeriodId, setReportingPeriodId] = useState(null);
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
        reportingPeriodId: reportingPeriodId,
      },
      workspaceSection
    );
  };
  const reportingPeroidSelectionHandler = (selectedObj) => {
    setReportingPeriodId(selectedObj.id);
    setExportState(
      selectedConfig.id,
      {
        checkedDataTypes: dataTypes.filter((e) => e.checked).map((e) => e.name),
        reportingPeriodId: selectedObj.id,
      },
      workspaceSection
    );
  };
  return (
    <>
      {loading ? <Preloader /> : null}
      <div className="margin-x-3 grid-container">
        <div className="grid-row">
          <h3 className="display-inline-block">
            <span className="font-body-lg">{facilityMainName}</span>
          </h3>{" "}
        </div>
        <div className=" grid-row text-bold font-body-xl display-block">
          {facilityAdditionalName}
        </div>
        <div className="grid-row margin-top-3">
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
              getInitSelection={() => null}
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
            >
              Preview
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportTab;
