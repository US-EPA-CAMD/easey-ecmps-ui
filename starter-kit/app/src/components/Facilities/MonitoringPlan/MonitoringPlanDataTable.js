import React, { useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/facilities";
import MonitoringPlanTableRender from "./MonitoringPlanTableRender";

export const MonitoringPlanDataTable = ({ facility }) => {
  const [activeOnly, setActiveOnly] = useState(true);
  const activeOnlyHandler = (evt) => {
    activeOnly ? setActiveOnly(false) : setActiveOnly(true);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Unit/stack Name",
        accessor: "col1",
        width: "100px",
      },
      {
        Header: "Status",
        accessor: "col2",
        width: "100px",
      },
      {
        Header: "Begin Year,Quarter",
        accessor: "col3",
        width: "120px",
      },
      {
        Header: "End Year,Quarter",
        accessor: "col4",
        width: "120px",
      },
      
    ],
    []
  );

  const formatRecords = (records) => {
    records.forEach((e) => {
    e.col1 = e.col1.join(", ");
    });
    return records;
  };

  const data = useMemo(() => {
    if (facility) {
      const records = fs.getMonitoringPlansTableRecords(facility);
      if (activeOnly) {
        return formatRecords(records).filter((d) => d.col2 === "Active");
      } else {
        return formatRecords(records);
      }
    } else {
      return [{ col2: "Loading list of Units..." }];
    }
  }, [activeOnly, facility]);

  return (
    <MonitoringPlanTableRender
      columns={columns}
      data={data}
      checkBoxHandler={activeOnlyHandler}
    />
  );
};

export default MonitoringPlanDataTable;
