import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import * as fs from "../../../utils/selectors/monitoringConfigurations";
import { loadMonitoringPlansArray } from "../../../store/actions/monitoringPlans";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import DataTableRender from "../../DataTableRender/DataTableRender";
import { setCheckoutState } from "../../../store/actions/dynamicFacilityTab";

export const DataTableConfigurations = ({
  loadMonitoringPlansData,
  monitoringPlans,
  data,
  user,
  selectedRowHandler,
  className,
  checkedOutLocations,
  setMostRecentlyCheckedInMonitorPlanId,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  setCheckout,
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

  const checkBackIn = (monitoringPlanId) => {
    const crypto = window.crypto || window.msCrypto;
    const array = new Uint32Array(1);
    const randomNumber = crypto.getRandomValues(array);

    mpApi
      .deleteCheckInMonitoringPlanConfiguration(monitoringPlanId)
      .then((res) => {
        setMostRecentlyCheckedInMonitorPlanId(
          `${monitoringPlanId}${randomNumber}`
        );
        setMostRecentlyCheckedInMonitorPlanIdForTab(
          `${monitoringPlanId}${randomNumber}`
        );

        try {
          setCheckout(false, monitoringPlanId);
        } catch (error) {
          // *** do nothing.  this is just in case someone tries to check in a facility
          // *** that does not have an open tab
        }
      });
  };

  const [openAndCheckoutBTNFocus, setOpenAndCheckoutBTNFocus] = useState("");
  const openConfig = (config, checkout, checkIn) => {
    const selectedConfigData = findSelectedConfig(config.col3);
    if (!checkIn) {
      if (checkout) {
        mpApi
          .postCheckoutMonitoringPlanConfiguration(config.col3, user.userId)
          .then((res) => {
            setSelectedConfig([data, selectedConfigData, checkout]);
          });
      } else {
        setSelectedConfig([data, selectedConfigData, checkout]);
      }
    } else {
      // monitoring plan id for api check in
      // oris code for redux state check in
      // checkBackIn(selectedConfigData.id);

      let x = document.querySelector(`[id="btnCheckBackIn"]`);

      let openBTN = x.parentNode.childNodes[0];

      checkBackIn(selectedConfigData.id);

      const ariaLabel = openBTN.getAttribute("aria-label");

      setOpenAndCheckoutBTNFocus(
        ariaLabel.substring(0, 4) +
          " and checkout" +
          ariaLabel.substring(4, ariaLabel.length)
      );
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
    setSelectedMp(monitoringPlans[monitoringPlans.length - 1]);

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
        checkedOutLocations={checkedOutLocations}
        setMostRecentlyCheckedInMonitorPlanId={
          setMostRecentlyCheckedInMonitorPlanId
        }
        setMostRecentlyCheckedInMonitorPlanIdForTab={
          setMostRecentlyCheckedInMonitorPlanIdForTab
        }
        setCheckBackInState={setCheckout}
        openAndCheckoutBTNFocus={openAndCheckoutBTNFocus}
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
    loadMonitoringPlansData: async (orisCode) => {
      dispatch(loadMonitoringPlansArray(orisCode));
    },
    setCheckout: (value, configID) =>
      dispatch(setCheckoutState(value, configID)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableConfigurations);
export { mapDispatchToProps };
export { mapStateToProps };
