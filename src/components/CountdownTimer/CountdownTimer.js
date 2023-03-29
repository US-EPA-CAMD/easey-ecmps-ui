import React from 'react';
import './CountdownTimer.scss';
import Timer from 'simple-circle-timer'


export const CountdownTimer = ({ duration, countdownExpired }) => {
  return (
    <div className="timer-wrapper margin-2">
      <p>
        It appears that you are no longer actively working within the
        application.
      </p>
      <p>
        All checked-out monitor plans will be checked-in and this session will
        be automatically logged out once the timer below reaches zero.
      </p>
      <div className="timer-container" aria-hidden="true">
        <Timer minutes={duration/60_000} size={200} fillColor="#004777" onComplete={countdownExpired} showMs={false}/>
      </div>
      <p>
        Click either the "Close" or "X" button to continue this session or "Log
        Out" to immediately log off.
      </p>
    </div>
  );
};
