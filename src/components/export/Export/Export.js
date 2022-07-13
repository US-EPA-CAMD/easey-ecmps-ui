import React from "react";

import { connect } from "react-redux";
import ExportTab from "../ExportTab/ExportTab";
import {
  convertSectionToStoreName,
  EXPORT_STORE_NAME
} from "../../../additional-functions/workspace-section-and-store-names";
import { setActiveTab } from "../../../store/actions/activeTab";
import { setExportState } from "../../../store/actions/dynamicFacilityTab";

export const Export = ({
  orisCode,
  selectedConfig,
  title,
  workspaceSection,
  exportTab,
  setExportState,
}) => {
  const getExportState = () => {
    const currentTabObj = exportTab.find(
      (e) => e.selectedConfig.id === selectedConfig.id
    );
    if (currentTabObj && currentTabObj.hasOwnProperty("exportState")) {
      return currentTabObj.exportState;
    } else {
      return null;
    }
  };

  return (
    <ExportTab
      facility={title}
      selectedConfig={selectedConfig}
      orisCode={orisCode}
      exportState={getExportState()}
      setExportState={setExportState}
      workspaceSection={workspaceSection}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs[
      convertSectionToStoreName(EXPORT_STORE_NAME)
    ],
    activeTab:
      state.activeTab[
        convertSectionToStoreName(EXPORT_STORE_NAME)
      ][0],
    exportTab: state.openedFacilityTabs.export,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTab: (orisCode, value) =>
      dispatch(
        setActiveTab(
          orisCode,
          value,
          convertSectionToStoreName(EXPORT_STORE_NAME)
        )
      ),
    setExportState: (configId, exportState, workspaceSection) =>
      dispatch(setExportState(configId, exportState, workspaceSection)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Export);
export { mapStateToProps };
export { mapDispatchToProps };
