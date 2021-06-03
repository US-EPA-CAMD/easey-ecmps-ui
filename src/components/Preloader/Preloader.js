import React from "react";

//import { CountdownTimer } from "../CountdownTimer/CountdownTimer";

import "./Preloader.scss";

export const Preloader = () => {
  return (
    <div className="text-center">
      {/*<p>
        <img
          alt="Content loading"
          title="Content loading"
          src={`${process.env.PUBLIC_URL}/images/preloaders/loading-snake.gif`}
        />
      </p>
      <p>
        <img
          alt="Please wait"
          title="Please wait"
          src={`${process.env.PUBLIC_URL}/images/preloaders/loading-text.gif`}
        />
      </p>*/}
      Loading... Please wait...
    </div>
  );
  /*return <CountdownTimer />;*/
};
