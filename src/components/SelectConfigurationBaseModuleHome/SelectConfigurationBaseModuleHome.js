import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import QACertTestSummaryTab from "../QACertTestSummaryTab/QACertTestSummaryTab";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import {
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EXPORT_STORE_NAME,
  EMISSIONS_DAILY_STORE_NAME,
  EMISSIONS_HOURLY_STORE_NAME,
  EMISSIONS_MATS_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import {
  qa_Certifications_Test_Summary_Module,
  export_Module,
  emissions_daily_module,
  emissions_hourly_module,
  emissions_mats_module,
} from "../../utils/constants/moduleTitles";
import Export from "../export/Export/Export";

export const SelectConfigurationBaseModuleHome = ({
  user,
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,
  openedFacilityTabs,
  workspaceSection,
}) => {
  useEffect(() => {
    switch (workspaceSection) {
      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        document.title = qa_Certifications_Test_Summary_Module;
        setTitleName(qa_Certifications_Test_Summary_Module);
        break;
      case EXPORT_STORE_NAME:
        document.title = export_Module;
        setTitleName(export_Module);
        break;
      case EMISSIONS_DAILY_STORE_NAME:
        document.title = emissions_daily_module;
        setTitleName(emissions_daily_module);
        break;
      case EMISSIONS_HOURLY_STORE_NAME:
        document.title = emissions_hourly_module;
        setTitleName(emissions_hourly_module);
        break;
      case EMISSIONS_MATS_STORE_NAME:
        document.title = emissions_mats_module;
        setTitleName(emissions_mats_module);
        break;
      default:
        break;
    }
  }, [workspaceSection]);

  const [titleName, setTitleName] = useState(document.title);

  const handleTabState = () => {
    const tabArr = [
      {
        title: "Select Configurations",
        component: (
          <DataTable
            user={user}
            keyField="col2"
            openedFacilityTabs={openedFacilityTabs}
            workspaceSection={workspaceSection}
          />
        ),
      },
    ];
    // uses Redux to put the saved Tabs back in the UI if the user leaves the page
    switch (workspaceSection) {
      case QA_CERT_TEST_SUMMARY_STORE_NAME:
        for (const row of openedFacilityTabs) {
          tabArr.push({
            title: row.name,
            component: (
              <QACertTestSummaryTab
                resetTimer={resetTimer}
                setExpired={setExpired}
                resetTimerFlag={resetTimerFlag}
                callApiFlag={callApiFlag}
                orisCode={row.orisCode}
                selectedConfig={row.selectedConfig}
                title={row.name}
                user={user}
                // checkout={row.checkout}
              />
            ),
            orisCode: row.orisCode,
            selectedConfig: row.selectedConfig,
            checkout: row.checkout,
          });
        }
        break;
      case EXPORT_STORE_NAME:
        for (const row of openedFacilityTabs) {
          tabArr.push({
            title: row.name,
            component: (
              <Export
                orisCode={row.orisCode}
                selectedConfig={row.selectedConfig}
                title={row.name}
                user={user}
                workspaceSection={workspaceSection}
              />
            ),
            orisCode: row.orisCode,
            selectedConfig: row.selectedConfig,
            checkout: row.checkout,
          });
        }
        break;
      default:
        break;
    }
    return tabArr;
  };

  return (
    <div className="react-transition fade-in padding-x-3">
      <div className="text-black margin-top-1 display-none tablet:display-block">
        <h2
          className="display-inline-block page-header margin-top-2"
          epa-testid={`${titleName.split(" ").join("")}Title`}
        >
          {titleName}
        </h2>
      </div>

      <div className="display-none mobile:display-block tablet:display-none">
        <h1
          className="display-inline-block font-body-xl text-bold margin-left-neg-2"
          epa-testid={`${titleName.split(" ").join("")}Title`}
        >
          {titleName}
        </h1>
      </div>

      <div>
        <DynamicTabs
          tabsProps={() => handleTabState()}
          user={user}
          workspaceSection={workspaceSection}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs[ownProps.workspaceSection],
  };
};

export default connect(
  mapStateToProps,
  null
)(SelectConfigurationBaseModuleHome);
export { mapStateToProps };
