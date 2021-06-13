import React, { useEffect, useRef, useState, useCallback } from "react";

import Modal from "../Modal/Modal";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { Button } from "@trussworks/react-uswds";
import { config } from "../../config";

export const InactivityTracker = () => {
  const [timeInactive, setTimeInactive] = useState(0);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [trackInactivity, setTrackInactivity] = useState(false);

  const resetUserInactivityTimer = () => {
    setTimeInactive(0);
    setShowInactiveModal(false);
    window.countdownInitiated = false;
  };

  const extendUserInactivityTimer = useCallback(() => {
    if (window.countdownInitiated !== true) {
      resetUserInactivityTimer();
    }
  }, []);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // *** remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    if (trackInactivity === false) {
      return;
    }

    // *** open modal
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

  const toggleInactivityTracking = () => {
    setTrackInactivity(!trackInactivity);
    resetUserInactivityTimer();
  };

  return (
    <div>
      <div className={`usa-overlay ${showInactiveModal ? "is-visible" : ""}`} />

      <div>
        <Button type="button" onClick={toggleInactivityTracking}>
          {trackInactivity === false
            ? "Start Tracking Inactivity"
            : "Stop Tracking Inactivity"}
        </Button>
        <span className="margin-left-3">
          time inactive: {timeInactive / 1000} seconds
        </span>
      </div>
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

export default InactivityTracker;
