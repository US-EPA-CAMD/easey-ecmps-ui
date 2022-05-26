import React, { useEffect } from "react";
import { connect } from "react-redux";

import DataTable from "../datatablesContainer/SelectFacilitiesDataTable/SelectFacilitiesDataTable";
import QACertTestSummaryTab  from "../QACertTestSummaryTab/QACertTestSummaryTab";
import DynamicTabs from "../DynamicTabs/DynamicTabs";
import { QA_CERT_TEST_SUMMARY_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

export const QACertTestSummaryHome = ({
  user,
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,
  openedFacilityTabs,
}) => {
  useEffect(() => {
    document.title = "QA Certifications Test Data";
  }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", checkInAll);

  //   return () => {
  //     window.removeEventListener("beforeunload", checkInAll);
  //   };
  // }, []);

  const handleTabState = () => {
    const tabArr = [
      {
        title: "Select Configurations",
        component: (
          <DataTable
            user={user}
            keyField="col2"
            openedFacilityTabs={openedFacilityTabs}
            workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
          />
        ),
      },
    ];
    // uses Redux to put the saved Tabs back in the UI if the user leaves the page
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
    return tabArr;
  };

  return (
    <div className="react-transition fade-in padding-x-3">
      <div className="text-black margin-top-1 display-none tablet:display-block">
        <h2
          className="display-inline-block page-header margin-top-2"
          epa-testid="qaCertTitle"
        >
          QA Certifications Test Data
        </h2>
      </div>

      <div className="display-none mobile:display-block tablet:display-none">
        <h1
          className="display-inline-block font-body-xl text-bold margin-left-neg-2"
          epa-testid="qaCertTitle"
        >
          QA Certifications Test Data
        </h1>
      </div>

      <div>
        <DynamicTabs
          tabsProps={() => handleTabState()}
          user={user}
          workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs:
      state.openedFacilityTabs[QA_CERT_TEST_SUMMARY_STORE_NAME],
  };
};

export default connect(mapStateToProps, null)(QACertTestSummaryHome);
export { mapStateToProps };
