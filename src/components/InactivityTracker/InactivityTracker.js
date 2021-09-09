import React, { useEffect, useState, useCallback } from "react";
import { config } from "../../config";
import { useInterval } from "../../additional-functions/use-interval";

import { Modal } from "../Modal/Modal";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { connect } from "react-redux";

export const InactivityTracker = ({
  apiCall,
  countdownExpired,
  openedFacilityTabs,
}) => {
  const [timeInactive, setTimeInactive] = useState(0);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [trackInactivity, setTrackInactivity] = useState(false);

  const [activityOccurred, setActivityOccurred] = useState(false);

  const resetUserInactivityTimer = () => {
    setTimeInactive(0);
    setShowInactiveModal(false);
    window.countdownInitiated = false;
  };

  const extendUserInactivityTimer = useCallback(() => {
    // *** if activity occurred and a countdown is not yet active
    if (window.countdownInitiated !== true) {
      setActivityOccurred(true);
      resetUserInactivityTimer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTrackInactivity(true);
  }, []);

  // *** set up a recurring API call to update
  useInterval(() => {
    // *** only fire the actual API call if activity has taken place
    if (activityOccurred === true) {
      // *** make an api call
      apiCall(true);
    }
    setActivityOccurred(false);
  }, config.app.activityRefreshApiCallInterval);

  useInterval(() => {
    if (trackInactivity === false) {
      return;
    }

    // *** open modal

    console.log("Tabs " + openedFacilityTabs);

    if (
      openedFacilityTabs &&
      openedFacilityTabs.length > 0 &&
      openedFacilityTabs[0].checkout == true
    ) {
      console.log("Have Checked Out A Record");
      if (
        config.app.inactivityDuration - timeInactive <=
        config.app.countdownDuration
      ) {
        // *** make sure countdown has started
        if (window.countdownInitiated === false) {
          window.countdownInitiated = true;
          setShowInactiveModal(true);
        }
      }
    }

    setTimeInactive(timeInactive + config.app.activityPollingFrequency);
  }, config.app.activityPollingFrequency);

  // *** assign / un-assign activity event listeners
  useEffect(() => {
    window.countdownInitiated = false;
    config.app.activityEvents.forEach((activityEvent) => {
      window.addEventListener(activityEvent, extendUserInactivityTimer);
    });

    // * clean up
    return () => {
      config.app.activityEvents.forEach((activityEvent) => {
        window.removeEventListener(activityEvent, extendUserInactivityTimer);
      });
    };
  }, [extendUserInactivityTimer]);

  // for demoing
  // const toggleInactivityTracking = () => {
  //   setTrackInactivity(!trackInactivity);
  //   resetUserInactivityTimer();
  // };

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
            <CountdownTimer
              countdownExpired={countdownExpired}
              duration={config.app.countdownDuration / 1000}
              apiCall={apiCall}
            />
          }
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

export default connect(mapStateToProps, null)(InactivityTracker);
export { mapStateToProps };
