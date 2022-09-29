import React from "react";
import { useState, useEffect, createContext } from "react";
import { config } from "../../config";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { useInterval } from "../../additional-functions/use-interval";
import { logOut } from "../../utils/api/easeyAuthApi";
import { setCheckoutState } from "../../store/actions/dynamicFacilityTab";
import { connect } from "react-redux";

import { Button } from "@trussworks/react-uswds";
import { ClearSharp } from "@material-ui/icons";
import "../Modal/Modal.scss";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
const modalClassName = "modal-wrapper bg-base-lightest radius-md";
const modalContext = createContext(null);
const widthPercent = 50;
const showCancel = true;

export const InactivityTracker = ({ openedFacilityTabs, setCheckout }) => {
  const [timeInactive, setTimeInactive] = useState(0);
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const isFacilityCheckedOut = () => {
    return openedFacilityTabs.find((element) => element.checkout === true);
  };

  const checkInactivity = async (inactivityDuration) => {
    if (inactivityDuration - timeInactive <= config.app.countdownDuration) {
      // display the countdown timer if not already initiated
      if (window.countdownInitiated === false) {
        window.countdownInitiated = true;
        setShowInactiveModal(true);
      }
    }
  };

  const resetUserInactivityTimer = () => {
    setTimeInactive(0);
    setShowInactiveModal(false);
    window.countdownInitiated = false;
  };

  useEffect(() => {
    window.countdownInitiated = false;
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

  useInterval(async () => {
    // first check if a record is checked out
    if (isFacilityCheckedOut()) {
      await checkInactivity(config.app.inactivityDuration);
    } else {
      await checkInactivity(config.app.inactivityLogoutDuration);
    }

    if (config.app.enableDebug === "true") {
      const rawMinutes = timeInactive / 60000;
      const minutes = Math.floor(rawMinutes);
      const rawSeconds = (timeInactive / 1000);
      const seconds = Math.floor(rawSeconds - (minutes * 60));
      console.log(`Idle Time (min:sec): ${minutes < 10 ? "0": ""}${minutes}:${seconds < 10 ? "0": ""}${seconds}`);
    }

    setTimeInactive(timeInactive + config.app.activityPollingFrequency);
  }, config.app.activityPollingFrequency);

  return (
    // in order to allow screen reader accessibility, the "Modal" component had to be copied
    // to create the inactivity timer modal inside of the aria-live region because
    // the shared modal file places the component inside portal using ReactDom.createPortal()
    <div>
      <div className={`usa-overlay ${showInactiveModal ? "is-visible" : ""}`} />
      {showInactiveModal ? (
        <div role="dialog" aria-modal="true">
          <div>
            <modalContext.Provider value={{ resetUserInactivityTimer }}>
              <div
                className={`${modalClassName} react-transition flip-in-x`}
                style={{
                  width: `${widthPercent}%`,
                  left: `${(100 - widthPercent) / 2}`,
                }}
              >
                <div className="modal-content modal-color padding-y-3">
                  <div className="modal-header modal-color  ">
                    <ClearSharp
                      className="position-absolute right-1 top-1 cursor-pointer text-bold"
                      onClick={resetUserInactivityTimer}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          resetUserInactivityTimer();
                        }
                      }}
                      id="closeModalBtn"
                      data-testid="closeModalBtn"
                      title="Close Modal"
                      epa-testid="closeXBtn"
                      role="button"
                      tabIndex="0"
                      aria-hidden={false}
                      aria-live="off"
                    />
                    <div className="left-0 bottom-0 padding-2" />
                  </div>
                  <span className="break-line" />
                  <div className="modal-body padding-top-0 modal-color maxh-tablet overflow-y-auto margin-top-2">
                    <div>
                      <CountdownTimer
                        duration={config.app.countdownDuration / 1000}
                        countdownExpired={async () => {
                          resetUserInactivityTimer();
                          await logOut();
                        }}
                      />
                    </div>
                  </div>
                  <span className="break-line" />
                  <div className="modal-footer  ">
                    {showCancel ? (
                      <Button
                        type="button"
                        onClick={resetUserInactivityTimer}
                        title="Click to close"
                        epa-testid="closeBtn"
                        className="float-left"
                        aria-live="off"
                      >
                        {"Close"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </modalContext.Provider>
          </div>
        </div>
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
    openedFacilityTabs: state.openedFacilityTabs[MONITORING_PLAN_STORE_NAME],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InactivityTracker);
export { mapStateToProps };
export { mapDispatchToProps };
