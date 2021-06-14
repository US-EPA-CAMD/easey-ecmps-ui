import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import * as fs from "../../../utils/selectors/monitoringConfigurations";
import DataTableConfigurationsRender from "../DataTableConfigurationsRender/DataTableConfigurationsRender";
import { loadMonitoringPlansArray } from "../../../store/actions/monitoringPlans";
import { normalizeRowObjectFormat } from "../../../additional-functions/react-data-table-component";
import { Button } from "@trussworks/react-uswds";
export const DataTableConfigurations = ({
  loading,
  loadMonitoringPlansData,
  monitoringPlans,
  data,
  user
}) => {

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("Configurations");
  columnNames.push("Status");

  // *** generate columns array of object based on columnNames array above
  const columns = [];

  useEffect(() => {
    let flag = false;
    for (const x of monitoringPlans) {
      if (x[0] === data.col1) {
        flag = true;
        break;
      }
    }
    if (flag === false) {
      loadMonitoringPlansData(data.col1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  columnNames.forEach((name, index) => {
    columns.push({
      name,
      selector: `col${index + 1}`,
      sortable: true,
    });
  });
  columns.push({
    name: "Actions",
    button: true,
    width: "25%",
    cell: (row) => {
      // *** normalize the row object to be in the format expected by DynamicTabs
      const normalizedRow = normalizeRowObjectFormat(row, columnNames);

      return (
        <div>
          <Button
            data-testid="btnOpenConfiguration"
            className="cursor-pointer"
            id="btnOpenConfiguration"
            //   onClick={() => selectedRowHandler(normalizedRow.cells)}
            aria-label={`open configuration ${normalizedRow.col1} `}
            //   onKeyPress={(event) => {
            //     if (event.key === "Enter") {
            //       selectedRowHandler(normalizedRow.cells);
            //       handleEnterPress(normalizedRow);
            //     }
            //   }}
          >
            Open
          </Button>
          {user ? (
            <Button
              data-testid="btnOpenCheckOut"
              className="cursor-pointer"
              //   onClick={() => selectedRowHandler(normalizedRow.cells)}
              aria-label={`open configuration and check out ${normalizedRow.col1} `}
              //   onKeyPress={(event) => {
              //     if (event.key === "Enter") {
              //       selectedRowHandler(normalizedRow.cells);
              //       handleEnterPress(normalizedRow);
              //     }
              //   }}
            >
              {"Open & Check Out"}
            </Button>
          ) : (
            ""
          )}
        </div>
      );
    },
  });

  const records = useMemo(() => {
    if (monitoringPlans.length >= 1) {
      let index = 0;
      for (const x of monitoringPlans) {
        if (x[0] === data.col1) {
          index = x[1];
          return fs.getConfigurationNames(index);
        }
      }
      return [{ col1: "Loading list of configurations..." }];
    } else {
      return [{ col1: "Loading list of configurations..." }];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans]);

  return (
    <div className="tabsBox">
      <DataTableConfigurationsRender
        columns={columns}
        data={records}
        // selectedRowHandler={selectedRowHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.apiCallsInProgress.monitoringPlans,
    monitoringPlans: state.monitoringPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringPlansData: (orisCode) =>
      dispatch(loadMonitoringPlansArray(orisCode)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableConfigurations);
