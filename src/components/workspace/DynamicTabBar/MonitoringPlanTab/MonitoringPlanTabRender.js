import React from "react";
import UswdsTable from "../../../Common/Table/UswdsTable";
import "./MonitoringPlanTabRender.css";
import { Checkbox } from "@trussworks/react-uswds";

const MonitoringPlanTabRender = ({ columns, data, checkBoxHandler }) => {
  return (
    <div className="tableContainer">
      <UswdsTable columns={columns} data={data} bordered={false} />
    </div>
  );
};

export default MonitoringPlanTabRender;
