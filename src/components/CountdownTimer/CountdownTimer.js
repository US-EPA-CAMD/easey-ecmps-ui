import React from "react";

import "./CountdownTimer.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const CountdownTimerRender = ({ remainingTime }) => {
  const currentTime = React.useRef(remainingTime);
  const prevTime = React.useRef(null);
  const isNewTimeFirstTick = React.useRef(false);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;

    // *** do this when the countdown is done
    if (remainingTime === 0) {
      //countdownExpired();
    }
  } else {
    isNewTimeFirstTick.current = false;
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        <div aria-live="polite" >{remainingTime}</div>
        <div className="font-alt-md position-relative left-neg-4">
          seconds left
        </div>
      </div>
      {prevTime.current !== null ? (
        <div
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
      It looks like you have been inactive for a while. You will be logged out
      in {duration} seconds. Click OK.
      <div className="timer-container" aria-hidden="true">
        <CountdownCircleTimer
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
