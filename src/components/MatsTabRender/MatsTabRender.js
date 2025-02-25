import React, { useState } from "react";

import CustomAccordion from "../CustomAccordion/CustomAccordion";
import MatsHeaderInfo from "../MatsHeaderInfo/MatsHeaderInfo";

export const MatsTabRender = ({
  checkout,
  locationSelect,
  orisCode,
  selectedConfigId,
  setLocationSelect,
  title,
  user,
}) => {
  const [filterApply, setFilterApply] = useState(false);

  return (
    <div className="padding-top-0">
      <div className="grid-row">
        <MatsHeaderInfo
          facility={title}
          orisCode={orisCode}
          selectedConfigId={selectedConfigId}
          user={user}
        />
      </div>
      <hr />
    </div>
  );
};

export default MatsTabRender;
