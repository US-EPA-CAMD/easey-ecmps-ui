import React, { useEffect, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import * as fs from "../../../utils/selectors/monitoringConfigurations";
import { loadMonitoringPlansArray } from "../../../store/actions/monitoringPlans";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { Button } from "@trussworks/react-uswds";
import DataTableRender from "../../DataTableRender/DataTableRender";
export const DataTableConfigurations = ({
  loading,
  loadMonitoringPlansData,
  monitoringPlans,
  data,
  user,
  selectedRowHandler,
  className,
}) => {
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("Configurations");
  columnNames.push("Status");

  // *** generate columns array of object based on columnNames array above
  const columns = [];

  const [selectedMP, setSelectedMp] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  const findSelectedConfig = (configID) => {
    let val = 0;
    if (selectedMP.length > 0) {
      for (const x of selectedMP[1]) {
        if (x.id === configID) {
          val = x;
          break;
        }
      }
    }
    return val;
  };

  const openConfig = (config, checkout) => {
    const selectedConfigData = findSelectedConfig(config.col3);
    setSelectedConfig([data, selectedConfigData, checkout]);
  };

  useEffect(() => {
    if (selectedConfig.length > 0) {
      selectedRowHandler(selectedConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConfig]);

  const flag = useRef(false);
  useEffect(() => {
    let flagValue = flag.current;
    if (monitoringPlans.length < 1) {
      loadMonitoringPlansData(data.col1);
      setDataLoaded(true);
    } else {
      for (const x of monitoringPlans) {
        if (x[0] === data.col1) {
          setSelectedMp(x);
          flagValue = true;
          setDataLoaded(true);
          break;
        }
      }
      if (flagValue === false) {
        loadMonitoringPlansData(data.col1);
        setDataLoaded(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const flagValue = flag.current;
    if (flagValue === false) {
      setSelectedMp(monitoringPlans[monitoringPlans.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans.length]);

  const checkOut = (config) => {
    mpApi
      .postCheckoutMonitoringPlanConfiguration(config.col3, user.firstName)
      .then((res) => {
        console.log(res, "data");
      });
    openConfig(config, true);
  };
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
      // const normalizedRow = normalizeRowObjectFormat(row, columnNames);
      return (
        <div>
          <Button
            unstyled="true"
            epa-testid="btnOpenConfiguration"
            className="cursor-pointer margin-right-1"
            id="btnOpenConfiguration"
            onClick={() => openConfig(row, false)}
            aria-label={`open configuration ${row.col1} `}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                openConfig(row, false);
              }
            }}
          >
            Open
          </Button>
          {user ? "|" : ""}
          {user ? (
            <Button
              unstyled="true"
              epa-testid="btnOpenCheckOut"
              className="cursor-pointer margin-left-1"
              onClick={() => checkOut(row)}
              aria-label={`open configuration and check out ${row.col1} `}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  checkOut(row);
                }
              }}
            >
              {" "}
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
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans]);

  return (
    <div className="tabsBox">
      <DataTableRender
        columns={columns}
        data={records}
        dataLoaded={dataLoaded}
        // selectedRowHandler={selectedRowHandler}
        tableStyling={"padding-left-4 padding-bottom-3"}
        defaultSort={"col2"}
        className={className}
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
