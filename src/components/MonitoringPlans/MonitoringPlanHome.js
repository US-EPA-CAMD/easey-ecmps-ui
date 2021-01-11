import React from "react";
import "./MonitoringPlanHome.css";
import DynamicTabs from "../Common/Tabs/DynamicTabs";
import DataTable from "./DynamicTabBar/SelectFacilitiesTab/DataTable";
// import { connect } from "react-redux";

// import {
//   // addDynamicTabs,
//   // removeDynamicTabs,
//   // checkDynamicTabs,
// } from "../../store/actions/dynamicFacilityTab";

const MonitoringPlanHome = ({
  dynamicFacilityTabs,
  addDynamicTab,
  removeDynamicTab,
  checkDynamicTab,
}) => {

  // const addDynamicTabHandler = (code) => {
  //   addDynamicTab(code);
  // };

  // const removeDynamicTabHandler = (code) => {
  //   removeDynamicTab(code);
  // };

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Monitoring Plans</h1>
        <button className="ovalBTN">Import</button>
      </div>

      <div className="tabsBar">
        <DynamicTabs
          tabsProps={[
            {
              title: "Select Facility",
              component: <DataTable />,
            },
          ]}
          // addDynamicTabHandler={addDynamicTabHandler}
          // removeDynamicTabHandler={removeDynamicTabHandler}
          // dynamicFacilityTabs={dynamicFacilityTabs}
        />
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     dynamicFacilityTabs: state.dynamicFacilityTabs,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeDynamicTab: (facility) =>
//       dispatch(removeDynamicTabs(facility)),
//     addDynamicTab: (facility) => dispatch(addDynamicTabs(facility)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(MonitoringPlanHome);
export default MonitoringPlanHome;