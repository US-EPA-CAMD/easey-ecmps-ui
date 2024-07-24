import React from "react";
import { Preloader } from "@us-epa-camd/easey-design-system";

export const SizedPreloader = ({ className = "", size = 9 }) => {
  return (
    <div
      className={`display-inline-flex flex-align-center height-${size} preloader-container width-${size} ${className}`}
    >
      <Preloader showStopButton={false} />
    </div>
  );
};

export default SizedPreloader;
