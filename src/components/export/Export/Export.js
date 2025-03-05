import React from "react";

import ExportTab from "../ExportTab/ExportTab";

export const Export = ({
  orisCode,
  selectedConfigId,
  title,
}) => {
  return (
    <ExportTab
      facility={title}
      selectedConfigId={selectedConfigId}
      orisCode={orisCode}
    />
  );
};

export default Export;
