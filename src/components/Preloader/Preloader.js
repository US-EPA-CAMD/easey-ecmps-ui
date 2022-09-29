import React from "react";

import "./Preloader.scss";

export const Preloader = () => {
  return (
    <div className="text-center">
      <p>
        <img
          alt="Content loading"
          title="Content loading"
          src={"/images/preloaders/loading-snake.gif"}
        />
      </p>
      <p>
        <img
          alt="Please wait"
          title="Please wait"
          src={"/images/preloaders/loading-text.gif"}
        />
      </p>
    </div>
  );
};

export default Preloader;
