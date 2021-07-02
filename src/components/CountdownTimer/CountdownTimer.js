import React, { useRef, useState } from "react";

import "./CountdownTimer.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountdownTimerRender = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // *** force final re-render when time is elapsed and trigger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        <div>{remainingTime}</div>
        <div className="font-alt-md position-relative left-neg-4">
          seconds left
        </div>
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

export const CountdownTimer = ({ duration,countdownAPI }) => {
  return (
    <div className="countdown-timer-wrapper">
      It looks like you have been inactive for a while. Save your changes to
      continue or lose unsaved work in {duration} seconds. Click OK.
      <div className="timer-container" aria-hidden="true">
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          size={230}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        >
          {CountdownTimerRender}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};
