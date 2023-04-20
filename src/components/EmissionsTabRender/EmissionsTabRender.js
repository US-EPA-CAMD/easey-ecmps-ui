import React, { useEffect, useState } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import { checkoutAPI } from "../../additional-functions/checkout";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import "./EmissionsTabRender.scss";
import { getEmissionViewData } from "../../utils/api/emissionsApi";
import { DataTableRender } from "../DataTableRender/DataTableRender";
import { useSelector } from "react-redux";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

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
  const [viewColumns, setViewColumns] = useState();
  const [viewData, setViewData] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState();

  // Determines if a user has just navigated to the page without applying any filters yet
  const isInitialLoadOfPage = currentTab?.isViewDataLoaded === undefined;

  useEffect(() => {
    setViewColumns(currentTab?.viewColumns || []);
    setViewData(currentTab?.viewData || []);
    setIsDataLoaded(isInitialLoadOfPage ? true : currentTab?.isViewDataLoaded);
    setViewTemplateSelect(currentTab?.viewTemplateSelect ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const handleDownload = async () => {
    const selectedUnitId = selectedConfig?.locations
      ?.filter((l) => l.id === locationSelect[1])
      .map((l) => l.unitId);
    const selectedStackPipeId = selectedConfig?.locations
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
      {!isInitialLoadOfPage && (
        <div>
          <div className="grid-row overflow-x-auto">
            <CustomAccordion
              title={viewTemplateSelect?.name}
              headerButtonText="Download To CSV"
              headerButtonClickHandler={handleDownload}
              table={[
                [
                  <DataTableRender
                    dataLoaded={isDataLoaded}
                    columnNames={viewColumns ?? []}
                    data={viewData ?? []}
                    headerButtonText
                  />,
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
