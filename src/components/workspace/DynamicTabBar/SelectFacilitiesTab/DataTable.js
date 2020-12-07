import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadFacilities } from "../../../../store/actions/facilities";
import * as fs from "../../../../utils/selectors/facilities";
import DataTableRender from "./DataTableRender";
import SelectedFacilityTab from "../SelectedFacilityTab/SelectedFacilityTab";

export const DataTable = ({
  facilities,
  loadFacilitiesData,
  loading,
  dataSelector,
  addTabs,
}) => {
  useEffect(() => {
    if (facilities.length === 0) {
      loadFacilitiesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Oris Code",
        accessor: "col1",
        width: "240px",
      },
      {
        Header: "Facility Name",
        accessor: "col2",
        width: "610px",
      },
      {
        Header: "State",
        accessor: "col3",
        width: "210px",
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (facilities.length > 0 || loading === false) {
      return fs.getTableRecords(facilities);
    } else {
      return [{ col2: "Loading list of facilities..." }];
    }
  }, [loading, facilities]);

  const viewDataHandler = (info) => {
    addTabs([
      {
        title: info[1].value,
        component: (
          <div className="selectedTabsBox">
            <SelectedFacilityTab orisCode={info[0].value} />
          </div>
        ),
      },
    ]);
  };

  return (
    <div className="tabsBox">
      <DataTableRender
        columns={columns}
        data={data}
        dataSelector={dataSelector}
        viewDataHandler={viewDataHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    loading: state.apiCallsInProgress.facilities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacilitiesData: () => dispatch(loadFacilities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
