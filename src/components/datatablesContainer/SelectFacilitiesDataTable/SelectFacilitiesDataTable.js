import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import * as fs from "../../../utils/selectors/facilities";
import SelectedFacilityTab from "../../MonitoringPlanTab/MonitoringPlanTab";
import DataTableRender from "../../DataTableRender/DataTableRender";
import "./SelectFacilitiesDataTable.scss";
import DataTableConfigurations from "../DataTableConfigurations/DataTableConfigurations";
import * as facilitiesApi from "../../../utils/api/facilityApi";
export const SelectFacilitiesDataTable = ({
  user,
  /*loadFacilitiesData,
  loading,*/
  addtabs,
  openedFacilityTabs,
}) => {
  const [facilities, setFacilities] = useState("");

  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    let isMounted = true;
    if (facilities.length === 0) {
      facilitiesApi.getAllFacilities().then((res) => {
        if (isMounted) {
          setDataLoaded(true);
          setFacilities(res.data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = ["Facility", "ORIS", "State"];

  const selectedRowHandler = (info) => {
    addtabs([
      {
        title: `${info[0].col2} (${info[1].name}) ${
          info[1].active ? "" : "Inactive"
        }`,
        component: (
          <div className="selectedTabsBox">
            <SelectedFacilityTab
              orisCode={info[0].col1}
              selectedConfig={info[1]}
              title={`${info[0].col2} (${info[1].name}) ${
                info[1].active ? "" : "Inactive"
              }`}
              user={user}
              checkout={info[2]}
            />
          </div>
        ),
        orisCode: info[0].col1,
        selectedConfig: info[1],
        checkout: info[2],
      },
    ]);
  };

  const data = useMemo(() => {
    if (facilities.length > 0) {
      return fs.getTableRecords(facilities).map((item) => {
        const disabled = false;
        let expanded = false;
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
      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilities]);

  return (
    <div className="tabsBox">
      <DataTableRender
        columnNames={columnNames}
        dataLoaded={dataLoaded}
        data={data}
        openedFacilityTabs={openedFacilityTabs}
        user={user}
        pagination={true}
        filter={true}
        sectionTitle="Select Configurations"
        expandableRows={true}
        expandableRowComp={
          <DataTableConfigurations
            selectedRowHandler={selectedRowHandler}
            user={user}
            className="expand-row-data-table"
          />
        }
        headerStyling="padding-top-0 padding-left-2"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

export default connect(mapStateToProps, null)(SelectFacilitiesDataTable);
