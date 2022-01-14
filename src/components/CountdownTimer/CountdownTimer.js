import React from "react";

import "./CountdownTimer.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const CountdownTimerRender = ({ remainingTime, countdownExpired }) => {
  const currentTime = React.useRef(remainingTime);
  const prevTime = React.useRef(null);
  const isNewTimeFirstTick = React.useRef(false);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;

    // *** do this when the countdown is done
    if (remainingTime === 0) {
      countdownExpired();
    }
  } else {
    isNewTimeFirstTick.current = false;
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div
        role="timer"
        aria-live="off"
        key={remainingTime}
        className={`time ${isTimeUp ? "up" : ""}`}
      >
        <div>{remainingTime}</div>
        <div className="font-alt-md position-relative left-neg-4">
          seconds left
        </div>
      </div>
      <span className="usa-sr-only">{remainingTime}</span>
      <span aria-live={remainingTime > 1 ? "off" : ""} className="usa-sr-only">
        Logging out due to inactivity
      </span>
      {prevTime.current !== null ? (
        <div
          aria-live="off"
          key={prevTime.current}
          className={`time ${isTimeUp ? "" : "down"}`}
        >
          {prevTime.current}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const CountdownTimer = ({ duration, countdownExpired }) => {
  return (
    <div className="countdown-timer-wrapper">
      <p>
        It looks like you have been inactive for a while. You will be logged out
        in {duration} seconds for inactivity. Click Close to remain active.
      </p>

      <div className="timer-container" aria-hidden="true">
        <CountdownCircleTimer
          id="test"
          isPlaying
          duration={duration}
          size={230}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        >
          <CountdownTimerRender countdownExpired={countdownExpired} />
        </CountdownCircleTimer>
      </div>
    </div>
  );
};
