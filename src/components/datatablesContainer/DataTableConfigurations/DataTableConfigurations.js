import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import * as fs from "../../../utils/selectors/monitoringConfigurations";
import { loadMonitoringPlansArray } from "../../../store/actions/monitoringPlans";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import DataTableRender from "../../DataTableRender/DataTableRender";

export const DataTableConfigurations = ({
  loadMonitoringPlansData,
  monitoringPlans,
  data,
  user,
  selectedRowHandler,
  className,
}) => {
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = ["Configurations", "Status"];

  // *** generate columns array of object based on columnNames array above

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
    if (checkout) {
      mpApi
        .postCheckoutMonitoringPlanConfiguration(config.col3, user.firstName)
        .then((res) => {
          console.log(res, "data");
          setSelectedConfig([data, selectedConfigData, checkout]);
        });
    } else {
      setSelectedConfig([data, selectedConfigData, checkout]);
    }
  };

  useEffect(() => {
    if (selectedConfig.length > 0) {
      selectedRowHandler(selectedConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConfig]);

  useEffect(() => {
    loadMonitoringPlansData(data.col2);
    setDataLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /*const flagValue = flag.current;
    if (flagValue === false) {*/
    setSelectedMp(monitoringPlans[monitoringPlans.length - 1]);
    //}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans.length]);

  const records = useMemo(() => {
    if (monitoringPlans.length >= 1) {
      let index = 0;
      for (const x of monitoringPlans) {
        if (x[0] === data.col2) {
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
        columnNames={columnNames}
        data={records}
        dataLoaded={dataLoaded}
        tableStyling={"padding-left-4 padding-bottom-3"}
        defaultSort={"col2"}
        className={className}
        openHandler={openConfig}
        actionsBtn="Open"
        user={user}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
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
export { mapDispatchToProps };
export { mapStateToProps };
