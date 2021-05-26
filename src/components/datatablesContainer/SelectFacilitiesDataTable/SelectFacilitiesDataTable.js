import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Button } from "@trussworks/react-uswds";
import { loadFacilities } from "../../../store/actions/facilities";
import * as fs from "../../../utils/selectors/facilities";
import SelectFacilitiesDataTableRender from "../SelectFacilitiesDataTableRender/SelectFacilitiesDataTableRender";
import SelectedFacilityTab from "../../MonitoringPlanTab/MonitoringPlanTab";
import {emptyMonitoringPlans } from "../../../store/actions/monitoringPlans";
import "./SelectFacilitiesDataTable.scss";

export const SelectFacilitiesDataTable = ({
  facilities,
  loadFacilitiesData,
  loading,
  addTabs,
  openedFacilityTabs,
  emptyPlan
}) => {
  useEffect(() => {
    if (facilities.length === 0) {
      loadFacilitiesData();
    }
    emptyPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*const columns = useMemo(
    () => [
      {
        Header: "ORIS",
        accessor: "col1",
        width: "200px",
      },
      {
        Header: "Facility",
        accessor: "col2",
        width: "810px",
      },
      {
        Header: "State",
        accessor: "col3",
        width: "410px",
      },
    ],
    []
  );*/

  const columns = [
    {
      name: "ORIS",
      selector: "col1",
      sortable: true,
      sortFunction: (a, b) => parseFloat(a) - parseFloat(b)
    },
    {
      name: "Facility",
      selector: "col2",
      sortable: true,
    },
    {
      name: "State",
      selector: "col3",
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      width: "25%",
      cell: (row) => {
        // *** normalize row to be in expected format for tabs
        row.cells = [];

        for (let i in row) {
          if (row.hasOwnProperty(i)) {
            const cellObject = {
              value: row[i],
            };
            row.cells.push(cellObject);
          }
        }

        return (
        <div className="cursor-pointer" onClick={() => selectedRowHandler(row.cells)}>
          <img
            height="32px"
            width="32px"
            alt="Open Tab"
            src={`${process.env.PUBLIC_URL}/images/openTab.jpg`}
            className="margin-right-1"
          />
          Open
        </div>
      )},
    },
  ];

  const data = useMemo(() => {
    if (facilities.length > 0 || loading === false) {
      return fs.getTableRecords(facilities);
    } else {
      return [{ col2: "Loading list of facilities..." }];
    }
  }, [loading, facilities]);

  const selectedRowHandler = (info) => {
    addTabs([
      {
        title: info[1].value,
        component: (
          <div className="selectedTabsBox">
            <SelectedFacilityTab orisCode={info[0].value} />
          </div>
        ),
        orisCode:info[0].value,
      },
    ]);
  };

  return (
    <div className="tabsBox">
      <SelectFacilitiesDataTableRender
        columns={columns}
        data={data}
        selectedRowHandler={selectedRowHandler}
        openedFacilityTabs={openedFacilityTabs}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacilitiesData: () => dispatch(loadFacilities()),
    emptyPlan: () =>dispatch(emptyMonitoringPlans()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFacilitiesDataTable);
