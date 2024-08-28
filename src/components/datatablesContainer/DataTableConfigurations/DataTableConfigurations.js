import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fs from "../../../utils/selectors/monitoringConfigurations";
import { loadMonitoringPlans } from "../../../store/actions/monitoringPlans";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { setCheckoutState } from "../../../store/actions/dynamicFacilityTab";
export const DataTableConfigurations = ({
  // monitoringPlans,
  data,
  user,
  selectedRowHandler,
  className,
  checkedOutLocations,
  setMostRecentlyCheckedInMonitorPlanId,
  setMostRecentlyCheckedInMonitorPlanIdForTab,

  workspaceSection,
}) => {
  const dispatch = useDispatch();
  const monitoringPlans = useSelector((state) => state.monitoringPlans);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = ["Configurations", "Status"];
  const facility = data.col1;
  const orisCode = data.col2;
  const facilityMonitoringPlans = useMemo(() => monitoringPlans[orisCode] ?? [], [monitoringPlans, orisCode]);

  // *** generate columns array of object based on columnNames array above

  const [selectedMP, setSelectedMp] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  const findSelectedConfig = (configID) => {
    let val = 0;
    if (selectedMP.length > 0) {
      for (const currentMP of selectedMP) {
        if (currentMP !== undefined) {
          for (const x of currentMP) {
            if (x.id === configID) {
              val = x;
              break;
            }
          }
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
          dispatch(setCheckoutState(false, monitoringPlanId, workspaceSection));

          setTimeout(() => {
            const elems = document.querySelectorAll(".tab-button");
            if (elems.length > 0) {
              elems[elems.length - 1].focus();
            }
          });
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
            setSelectedRow([data, selectedConfigData, checkout]);

            try {
              dispatch(
                setCheckoutState(true, selectedConfigData.id, workspaceSection)
              );
            } catch {}
          });
      } else {
        setSelectedRow([data, selectedConfigData, checkout]);
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
    if (selectedRow.length > 0) {
      selectedRowHandler(selectedRow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow]);

  useEffect(() => {
    const callbackFunction = () => {
      loadMonitoringPlans(orisCode)(dispatch).then(() => setDataLoaded(true));
    };
    // Call the callback function
    callbackFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (dataLoaded) {
      setSelectedMp([
        ...selectedMP,
        facilityMonitoringPlans,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityMonitoringPlans]);

  const records = useMemo(() => {
    if (dataLoaded) {
      if (facilityMonitoringPlans.length >= 1) {
            return fs.getConfigurationNames(facilityMonitoringPlans);
      }
    }
    return [];
  }, [dataLoaded, facilityMonitoringPlans]);

  return (
    <div className="tabsBox">
      <DataTableRender
        columnNames={columnNames}
        data={records}
        dataLoaded={dataLoaded}
        tableStyling={"padding-left-4 padding-bottom-3"}
        defaultSort="col2"
        defaultSortDir="asc"
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
        setCheckBackInState={setCheckoutState}
        openAndCheckoutBTNFocus={openAndCheckoutBTNFocus}
        ariaLabel={`Configurations for ${facility}`}
        workspaceSection={workspaceSection}
      />
    </div>
  );
};

export default DataTableConfigurations;
