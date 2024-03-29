import React, { useEffect, useState } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import { checkoutAPI } from "../../additional-functions/checkout";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import "./EmissionsTabRender.scss";
import { getEmissionViewData } from "../../utils/api/emissionsApi";
import { useSelector } from "react-redux";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import { EmissionsViewTable } from "../EmissionsViewTable/EmissionsViewTable";

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
  const currentTab = useSelector((state) =>
    state.openedFacilityTabs[EMISSIONS_STORE_NAME].find(
      (t) => t.selectedConfig.id === configID
    )
  );
  
  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);

  const [viewTemplateSelect, setViewTemplateSelect] = useState(null);

  // Determines if a user has just navigated to the page without applying any filters yet
  const isInitialLoadOfPage = currentTab?.isViewDataLoaded === undefined;

  useEffect(() => {
   
    setViewTemplateSelect(currentTab?.viewTemplateSelect ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab.viewTemplateSelect]);

  const handleDownload = async () => {
    const selectedUnitId = selectedConfig?.monitoringLocationData
      ?.filter((l) => l.id === locationSelect[1])
      .map((l) => l.unitId);
    const selectedStackPipeId = selectedConfig?.monitoringLocationData
      ?.filter((l) => l.id === locationSelect[1])
      .map((l) => l.stackPipeId);

    getEmissionViewData(
      viewTemplateSelect.code,
      configID,
      currentTab.reportingPeriods,
      selectedUnitId,
      selectedStackPipeId,
      user,
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
    <div className="padding-top-0">
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
          currentTab={currentTab}
        />
      </div>
      <hr />
      {!isInitialLoadOfPage && 
      (!viewTemplateSelect || viewTemplateSelect?.code === "SELECT") ? (
        <div>
          <div className="grid-row overflow-x-auto">
            {!user ? (
              <p>There is either no data available for that configuration or you have not applied filters yet (2022 currently has the most data)</p>
            ) : (
              <p>Please import an emissions file for the selected year and quarter or apply filters to view data</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="grid-row overflow-x-auto">
            <CustomAccordion
              title={viewTemplateSelect?.name}
              headerButtonText="Download To CSV"
              headerButtonClickHandler={handleDownload}
              table={[
                [
                  <EmissionsViewTable monitorPlanId={configID} />,
                  viewTemplateSelect?.name ?? "",
                ],
              ]}
            ></CustomAccordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmissionsTabRender;
