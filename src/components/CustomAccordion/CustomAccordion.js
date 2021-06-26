import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import {
    KeyboardArrowDownSharp,
    KeyboardArrowUpSharp,
  } from "@material-ui/icons";
const CustomAccordion = ({ title, table }) => {
  const [open, setOpen] = useState(table.map((item, index) => true));


  useEffect(() =>{
    setOpen(table.map((item, index) => true));


  },[table])
  // updates all tables whenever a location is changed
  const tableState = (index, val) => {
    setOpen(table.map((item, ind) => (ind === index ? val : open[ind])));
  };
  return (
    <div className="">
      {table.map((item, index) => (
        <div key={index}>
          {open[index] ? (
             <div className="text-bold font-body-xl display-block height-auto">
              <Button
                aria-label="Collapse Row"
                className="bg-base-lighter"
                onClick={() => tableState(index, false)}
              >
                <KeyboardArrowUpSharp/>
              </Button>{title}
            </div>
          ) : (
            <div className="text-bold font-body-xl display-block height-auto">
              <Button
                aria-label="Expand Row"
                className="bg-base-lighter"
                onClick={() => tableState(index, true)}
              >
              <KeyboardArrowDownSharp/>
              </Button>{title}
            </div>
          )}
          {open[index] ? item : ""}
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
