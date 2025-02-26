import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { getMatsSubmissions } from "../../utils/api/qaCertificationsAPI";
import { dataStatus } from "../../utils/constants/dataStatus";
import StatusContent from "../StatusContent/StatusContent";

const MatsDataTable = ({
  selectedConfigId,
  selectedLocation,
  selectedReportType,
}) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(dataStatus.IDLE);

  useEffect(() => {
    if (status !== dataStatus.IDLE) return;
  }, [status]);

  return (
    <StatusContent label="MATS Submission" status={status}></StatusContent>
  );
};

export default MatsDataTable;
