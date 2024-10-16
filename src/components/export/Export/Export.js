import React from "react";

import { connect } from "react-redux";
import ExportTab from "../ExportTab/ExportTab";
import {
  convertSectionToStoreName,
  EXPORT_STORE_NAME
} from "../../../additional-functions/workspace-section-and-store-names";
import { setExportState } from "../../../store/actions/dynamicFacilityTab";

export const Export = ({
  orisCode,
  selectedConfigId,
  title,
  workspaceSection,
  exportTab,
  setExportState,
}) => {
  const getExportState = () => {
    const currentTabObj = exportTab.find(
      (e) => e.selectedConfig.id === selectedConfigId,
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
      selectedConfigId={selectedConfigId}
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
    exportTab: state.openedFacilityTabs.export,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setExportState: (configId, exportState, workspaceSection) =>
      dispatch(setExportState(configId, exportState, workspaceSection)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Export);
export { mapStateToProps };
export { mapDispatchToProps };
