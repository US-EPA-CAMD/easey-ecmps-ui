import React, { useRef, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ReactDom from "react-dom";
import { Button } from "@trussworks/react-uswds";
import { ClearSharp } from "@material-ui/icons";
import { config } from "../../config";
import { logOut, refreshLastActivity } from "../../utils/api/easeyAuthApi";
import "./InactivityTracker.scss";
import {
  currentDateTime,
  currentSecondsTilInactive,
} from "../../utils/functions";

const inactiveDuration = config.app.inactivityDuration / 1000;

const renderTime = ({ remainingTime }) => {
  // Inner text for spinner
  if (remainingTime === 0) {
    return <div className="timer">Signing Out...</div>;
  }

  const seconds = remainingTime % 60;
  const minutes = Math.floor(remainingTime / 60);
  const padMinutes = minutes.toString().padStart(2, "0");
  const padSeconds = seconds.toString().padStart(2, "0");

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">
        {padMinutes}:{padSeconds}
      </div>
      <div className="text">seconds</div>
    </div>
  );
};

export const InactivityTracker = () => {
  const signingOut = useRef(false); //Prevent double sign outs
  const wasActiveInWindow = useRef(false); //Activity monitor

  const showCountdownRef = useRef(false); //Use a ref that we can manipulate and set the showCountdown [avoids weird state behavior]
  const [showCountdown, setShowCountdown] = useState(showCountdownRef.current); //State management determines when to show the countdown modal based on the corresponding ref

  const hideUserInactivityTimer = () => {
    if (showCountdownRef.current) {
      showCountdownRef.current = false;
      setShowCountdown(showCountdownRef.current);
    }
  };

  const extendSessionExpiration = () => {
    //Extends user session expiration window every activity
    const newExpiration = currentDateTime();
    newExpiration.setSeconds(newExpiration.getSeconds() + inactiveDuration);
    localStorage.setItem(
      "ecmps_session_expiration",
      newExpiration.toLocaleString()
    );
  };

  const handleUserActivity = () => {
    wasActiveInWindow.current = true;
    extendSessionExpiration();
    hideUserInactivityTimer();
  };

  const signOutUser = () => {
    if (!signingOut.current) {
      signingOut.current = true;
      //Callback to sign user out when timer is finished
      logOut();
    }
  };

  useEffect(() => {
    extendSessionExpiration(); //Extend / Create our sliding session window

    localStorage.setItem("ecmps_signing_out", false); //Used as a debounce when we have multiple sessions all reaching their log out point

    const interval = setInterval(() => {
      //This checks the users activity status every second
      const timeTilInactive = currentSecondsTilInactive();

      if (
        !showCountdownRef.current &&
        timeTilInactive <= inactiveDuration / 2
      ) {
        //Show the timer if our inactivity window is at the start of the countdown window
        showCountdownRef.current = true;
        setShowCountdown(showCountdownRef.current);
      } else if (
        showCountdownRef.current &&
        timeTilInactive >= inactiveDuration / 2
      ) {
        hideUserInactivityTimer();
      }

      if (timeTilInactive <= 0) {
        signOutUser();
      }
    }, 1000);

    const activityInterval = setInterval(() => {
      if (wasActiveInWindow.current) {
        refreshLastActivity();
      }

      wasActiveInWindow.current = false;
    }, config.app.refreshLastActivityInterval);

    // Bind event listeners to user input, this drives the inactivity
    config.app.activityEvents.forEach((activityEvent) => {
      window.addEventListener(activityEvent, handleUserActivity);
    });

    window.addEventListener("visibilitychange", () => {
      //Handle user leaving main page and returning
      if (
        document.visibilityState === "visible" &&
        currentSecondsTilInactive() <= inactiveDuration / 2
      ) {
        setShowCountdown(false); //Need these two lines to force a state change on the page becoming visible again
        setShowCountdown(true);
      }
    });

    // * clean up
    return () => {
      clearInterval(interval);
      clearInterval(activityInterval);
      config.app.activityEvents.forEach((activityEvent) => {
        window.removeEventListener(activityEvent, handleUserActivity);
      });
    };
  }, []);

  let modalRoot = document.getElementById("portal");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "portal");
    document.body.appendChild(modalRoot);
  }

  return ReactDom.createPortal(
    <div className="modal-back">
      {showCountdown && (
        <div className="usa-overlay is-visible">
          <div role="dialog" aria-modal="true">
            <div
              className="modal-wrapper"
              style={{
                width: "30%",
                left: "35%",
                top: "30%",
              }}
            >
              <div className="modal-content modal-color padding-y-3">
                <div className="modal-header modal-color padding-y-1 border-bottom-1px border-base-lighter">
                  <ClearSharp className="position-absolute right-1 top-1 cursor-pointer text-bold" />
                </div>

                <div className="modal-body padding-top-0 modal-color maxh-tablet overflow-y-auto">
                  <h3 className="text-center">
                    It looks like you have been inactive for a while. You will
                    be logged out soon for inactivity. Click the 'Close' button
                    to remain active.
                  </h3>
                  <div className="timer-wrapper">
                    <CountdownCircleTimer
                      duration={inactiveDuration / 2}
                      initialRemainingTime={currentSecondsTilInactive()}
                      colors={[
                        ["#004777", 0.33],
                        ["#F7B801", 0.33],
                        ["#A30000"],
                      ]}
                      isPlaying
                      onComplete={signOutUser}
                    >
                      {renderTime}
                    </CountdownCircleTimer>
                  </div>
                </div>
              </div>
              <span className="break-line" />
              <div className="modal-footer">
                <Button
                  type="button"
                  title="Click to close"
                  className="margin-right-2"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
    modalRoot
  );
};
