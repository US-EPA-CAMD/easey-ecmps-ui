import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import {
    ArrowDownwardSharp,
    KeyboardArrowDownSharp,
    KeyboardArrowUpSharp,
  } from "@material-ui/icons";
const CustomAccordion = ({ title, table }) => {
  const [open, setOpen] = useState(table.map((item, index) => true));

  // updates all tables whenever a location is changed
  const tableState = (index, val) => {
    setOpen(table.map((item, ind) => (ind === index ? val : open[ind])));
  };
  return (
    <div className="">
      {table.map((item, index) => (
        <div>
          {open[index] ? (
            <div>
              <Button
                aria-label="Collapse Row"
                className="sc-iCoGMd inrgiU"
                onClick={() => tableState(index, false)}
              >
                <KeyboardArrowUpSharp/>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                aria-label="Expand Row"
                className="sc-iCoGMd inrgiU"
                onClick={() => tableState(index, true)}
              >
              <KeyboardArrowDownSharp/>
              </Button>
            </div>
          )}
          {open[index] ? item : ""}
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
