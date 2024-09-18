import React from "react";
import { Preloader } from "@us-epa-camd/easey-design-system";

export const SizedPreloader = ({ className = "", size = 9 }) => {
  return (
    <div
      className={`display-inline-flex flex-align-center height-auto preloader-container width-auto ${className}`}
    >
      <Preloader
        showStopButton={false}
        className={`height-${size} width-${size}`}
      />
    </div>
  );
};

export default SizedPreloader;
