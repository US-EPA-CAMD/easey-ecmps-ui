import React, { useEffect, useMemo,useState } from "react";
import { connect } from "react-redux";
import { loadFacilities } from "../../../store/actions/facilities";
import * as fs from "../../../utils/selectors/facilities";
import SelectFacilitiesDataTableRender from "../SelectFacilitiesDataTableRender/SelectFacilitiesDataTableRender";
import SelectedFacilityTab from "../../MonitoringPlanTab/MonitoringPlanTab";
import { emptyMonitoringPlans } from "../../../store/actions/monitoringPlans";
// import { normalizeRowObjectFormat } from "../../../additional-functions/react-data-table-component";

import "./SelectFacilitiesDataTable.scss";

export const SelectFacilitiesDataTable = ({
  facilities,
  loadFacilitiesData,
  loading,
  addTabs,
  openedFacilityTabs,
  emptyPlan,
  monitoringPlans,
}) => {
  useEffect(() => {
    if (facilities.length === 0) {
      loadFacilitiesData();
    }
    // emptyPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cdxUser = sessionStorage.getItem("cdx_user")
    ? JSON.parse(sessionStorage.getItem("cdx_user"))
    : false;
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const checkLoggedIn = () => {
    if (cdxUser && firstName) {
      setUserLoggedIn(true);
    }
  };
  const firstName = cdxUser && cdxUser.firstName ? cdxUser.firstName : false;

  useEffect(() => {
    checkLoggedIn();
  }, []);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("ORIS");
  columnNames.push("Facility");
  columnNames.push("State");

  // *** generate columns array of object based on columnNames array above
  let columns = [];
  // const handleEnterPress = (normalizedRow) => {
  //   setTimeout(function () {
  //     const tableBody = document.getElementsByClassName("button-group");
  //     tableBody[tableBody.length - 1].focus();
  //   }, 700);
  // };
  columnNames.forEach((name, index) => {
    switch (name) {
      case "ORIS":
        columns.push({
          name,
          selector: `col${index + 1}`,
          sortable: true,
          sortFunction: (a, b) =>
            parseFloat(a[`col${index + 1}`]) - parseFloat(b[`col${index + 1}`]),
        });
        break;
      default:
        columns.push({
          name,
          selector: `col${index + 1}`,
          sortable: true,
        });
        break;
    }
  });

  const selectedRowHandler = (info) => {
    addTabs([
      {
        title: info[1].value,
        component: (
          <div className="selectedTabsBox">
            <SelectedFacilityTab orisCode={info[0].value} />
          </div>
        ),
        orisCode: info[0].value,
      },
    ]);
  };

  const data = useMemo(() => {
    if (facilities.length > 0) {
      return fs.getTableRecords(facilities).map((item) => {
        const disabled = false;
        const expanded = false;
        // modify this for keeping expanded state between tabs
        // for(const x of monitoringPlans){
        //   if(x[0] === item.col1){
        //     expanded =true;
        //     break;
        //   }
        // }
        return { ...item, disabled, expanded };
      });
    } else {
      return [{ col2: "Loading list of facilities..." }];
    }
  }, [facilities]);

  return (
    <div className="tabsBox">
      <SelectFacilitiesDataTableRender
        columns={columns}
        data={data}
        selectedRowHandler={selectedRowHandler}
        openedFacilityTabs={openedFacilityTabs}
        user ={userLoggedIn}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
    openedFacilityTabs: state.openedFacilityTabs,
    monitoringPlans: state.monitoringPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacilitiesData: () => dispatch(loadFacilities()),
    emptyPlan: () => dispatch(emptyMonitoringPlans()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFacilitiesDataTable);
