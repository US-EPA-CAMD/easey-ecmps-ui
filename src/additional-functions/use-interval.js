import { useEffect, useRef } from "react";

// *** fixes setInterval issue with React
// *** basically, since React reruns effects on every render, it can potentially cause setInterval
// *** time duration to shift, and therefore possibly never even get a chance to fire if
// *** the interval is small enough.  Making useInterval DECLARATIVE, as below,
// *** solves that issue
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // *** remember the latest callback function
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
