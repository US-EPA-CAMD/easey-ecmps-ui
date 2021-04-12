import React from "react";
import UswdsTable from "../../Common/Table/UswdsTable";
import "./UnitsTableRender.css";
import { Checkbox } from "@trussworks/react-uswds";

const UnitsTableRender = ({
  columns,
  data,
  checkBoxHandler,
  selectedRowHandler,
}) => {
  return (
    <div className="tableContainer">
      <p>
        <strong>Instructions:</strong> click on a unit ID in the table to
        display detailed information.
      </p>
      <Checkbox
        id="operating"
        name="operating"
        label="Show operating units only"
        defaultChecked
        onChange={checkBoxHandler}
      />
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        selectedRowHandler={selectedRowHandler}
        defaultSelect={true}
        header
      />
    </div>
  );
};

export default UnitsTableRender;
