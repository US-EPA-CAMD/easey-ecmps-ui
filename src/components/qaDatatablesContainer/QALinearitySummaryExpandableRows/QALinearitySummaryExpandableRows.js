import React from "react";
import LinearitySummaryDataRows from "./LinearitySummaryDataRows.js";
import ProtocolGasDataRows from "./ProtocolGasDataRows.js";

const QALinearitySummaryExpandableRows = ({
  user,
  nonEditable,
  locationSelectValue,
  data,
}) => {

  return (
    <>
      <LinearitySummaryDataRows
        user={user}
        nonEditable={nonEditable}
        locationSelectValue={locationSelectValue}
        data={data}
      />
      <ProtocolGasDataRows
        data={data}
      />
    </>
  )
}

export default QALinearitySummaryExpandableRows
