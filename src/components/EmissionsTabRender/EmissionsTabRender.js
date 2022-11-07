import React, { useState } from "react";
import { Button } from "@trussworks/react-uswds";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import { checkoutAPI } from "../../additional-functions/checkout";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import { getEmissionsTabTableRenders } from "./EmissionsTabTable";
import "./EmissionsTabRender.scss";
import { getEmissionViewData } from "../../utils/api/emissionsApi";

export const EmissionsTabRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setLocationSelect,
  locationSelect,
  orisCode,
  configID,
  checkout,
  setCheckout,
  setInactive,
  inactive,
  workspaceSection,
}) => {
  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);

  const [viewTemplateSelect, setViewTemplateSelect] = useState(null);
  const [selectedReportingPeriods, setSelectedReportingPeriods] = useState([]);
  const showTable = Boolean(
    selectedReportingPeriods.length > 0 && viewTemplateSelect !== null
  );

  const handleDownload = async () => {
    getEmissionViewData(
      viewTemplateSelect.code,
      configID,
      selectedReportingPeriods,
      selectedConfig?.unitStackConfigurations.map((config) => config.unitId),
      selectedConfig?.unitStackConfigurations.map(
        (config) => config.stackPipeId
      ),
      true
    )
      .then((response) => {
        const disposition = response.headers["content-disposition"];
        const parts =
          disposition !== undefined ? disposition.split("; ") : undefined;

        if (parts !== undefined && parts[0] === "attachment") {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "text/csv" })
          );

          const link = document.createElement("a");
          let fileName = parts[1].replace("filename=", "").replaceAll('"', "");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" padding-top-0">
      <div className="grid-row">
        <HeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          orisCode={orisCode}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          checkout={checkout}
          user={user}
          checkoutAPI={checkoutAPI}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={inactive}
          configID={configID}
          setUpdateRelatedTables={setUpdateRelatedTables}
          updateRelatedTables={updateRelatedTables}
          workspaceSection={workspaceSection}
          viewTemplateSelect={viewTemplateSelect}
          setViewTemplateSelect={setViewTemplateSelect}
          selectedReportingPeriods={selectedReportingPeriods}
          setSelectedReportingPeriods={setSelectedReportingPeriods}
        />
      </div>
      <hr />
      {showTable && (
        <Button
          type="button"
          title="Download to CSV"
          className="download-button"
          onClick={handleDownload}
        >
          {"Download to CSV"}
        </Button>
      )}
      {showTable && (
        <div className="grid-row overflow-x-auto">
          <CustomAccordion
            title={"Daily Calibration Tests"}
            table={getEmissionsTabTableRenders(
              viewTemplateSelect,
              configID,
              selectedReportingPeriods,
              selectedConfig?.unitStackConfigurations.map(
                (config) => config.unitId
              ),
              selectedConfig?.unitStackConfigurations.map(
                (config) => config.stackPipeId
              )
            )}
          ></CustomAccordion>
        </div>
      )}
    </div>
  );
};

export default EmissionsTabRender;
