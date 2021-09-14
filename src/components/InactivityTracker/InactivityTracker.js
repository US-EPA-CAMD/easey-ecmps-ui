import React from "react";
import { useState, useEffect } from "react";
import { config } from "../../config";
import { Modal } from "../Modal/Modal";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { useInterval } from "../../additional-functions/use-interval";
import { checkoutAPI } from "../../additional-functions/checkout";
import { logOut } from "../../utils/api/easeyAuthApi";
import { setCheckoutState } from "../../store/actions/dynamicFacilityTab";
import { connect } from "react-redux";

export const InactivityTracker = ({ openedFacilityTabs, setCheckout }) => {
  const [timeInactive, setTimeInactive] = useState(0);
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const isFacilityCheckedOut = () => {
    return (
      openedFacilityTabs.length > 0 && openedFacilityTabs[0].checkout === true
    );
  };

  const checkInactivity = (inactivityDuration, handler) => {
    if (inactivityDuration - timeInactive <= config.app.countdownDuration) {
      // Display the countdown timer

      if (window.countdownInitiated === false) {
        window.countdownInitiated = true;
        setShowInactiveModal(true);
      }
    }

    if (timeInactive >= inactivityDuration) {
      console.log("Time is up!");
      resetUserInactivityTimer();

      if (handler !== undefined) handler();

      logOut(undefined);
    }
  };

  const resetUserInactivityTimer = () => {
    setTimeInactive(0);
    setShowInactiveModal(false);
    window.countdownInitiated = false;

    /*
    console.log(
    mpApi.putLockTimerUpdateConfiguration(configID),
    "api called"
    );
    */
  };

  useEffect(() => {
    window.countdownInitiated = false;
    console.log("Started Inactivity Timer");
    config.app.activityEvents.forEach((activityEvent) => {
      window.addEventListener(activityEvent, resetUserInactivityTimer);
    });

    // * clean up
    return () => {
      config.app.activityEvents.forEach((activityEvent) => {
        window.removeEventListener(activityEvent, resetUserInactivityTimer);
      });
    };
  }, []);

  useInterval(() => {
    // First check if a record is checked out
    if (isFacilityCheckedOut()) {
      checkInactivity(config.app.inactivityDuration, () => {
        const currentCheckedOut = openedFacilityTabs[0];
        checkoutAPI(
          false,
          currentCheckedOut.selectedConfig.id,
          currentCheckedOut.selectedConfig,
          setCheckout
        );
      });
    } else {
      checkInactivity(config.app.inactivityLogoutDuration, undefined);
    }

    setTimeInactive(timeInactive + config.app.activityPollingFrequency);
  }, config.app.activityPollingFrequency);

  return (
    <div>
      <div className={`usa-overlay ${showInactiveModal ? "is-visible" : ""}`} />

      {showInactiveModal ? (
        <Modal
          show={showInactiveModal}
          close={resetUserInactivityTimer}
          showCancel={true}
          cancelButtonText="OK"
          children={
            <CountdownTimer duration={config.app.countdownDuration / 1000} />
          }
        />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCheckout: (value, configID) =>
      dispatch(setCheckoutState(value, configID)),
  };
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InactivityTracker);
