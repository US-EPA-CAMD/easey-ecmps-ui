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

const modalClassName = "modal-wrapper bg-base-lightest radius-md";
const modalContext = createContext(null, null);
const width = "50%";
const left = "25%";
const showCancel = true;

export const InactivityTracker = ({ openedFacilityTabs, setCheckout }) => {
  const [timeInactive, setTimeInactive] = useState(0);
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const isFacilityCheckedOut = () => {
    return openedFacilityTabs.find((element) => element.checkout === true);
  };

  const checkInactivity = (inactivityDuration) => {
    if (inactivityDuration - timeInactive <= config.app.countdownDuration) {
      // Display the countdown timer

      if (window.countdownInitiated === false) {
        window.countdownInitiated = true;
        setShowInactiveModal(true);
      }
    }

    if (timeInactive >= inactivityDuration) {
      resetUserInactivityTimer();

      logOut(undefined);
    }
  };

  const resetUserInactivityTimer = () => {
    setTimeInactive(0);
    setShowInactiveModal(false);
    window.countdownInitiated = false;
    console.log("inactivity timer reset");
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
      checkInactivity(config.app.inactivityDuration);
    } else {
      checkInactivity(config.app.inactivityLogoutDuration);
    }

    setTimeInactive(timeInactive + config.app.activityPollingFrequency);
  }, config.app.activityPollingFrequency);

  return (
    // in order to allow screenreader accessibility, the "Modal" component had to be copied
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
                  width: width,
                  left: left,
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
                    />
                    <div className="left-0 bottom-0 padding-2"></div>
                  </div>

                  <div className="modal-body padding-top-0 modal-color maxh-tablet overflow-y-auto margin-top-2">
                    <div>
                      <CountdownTimer
                        duration={config.app.countdownDuration / 1000}
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
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InactivityTracker);
