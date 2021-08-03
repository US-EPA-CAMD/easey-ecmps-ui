import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@material-ui/icons";
const CustomAccordion = ({ title, table }) => {
  const [open, setOpen] = useState(table.map((item, index) => true));

  console.log('TABLE',table)
  useEffect(() => {
    setOpen(table.map((item, index) => true));
  }, [table]);
  // updates all tables whenever a location is changed
  const tableState = (index, val) => {
    setOpen(table.map((item, ind) => (ind === index ? val : open[ind])));
  };
  return (
    <div className="">
      {table.map((item, index) => (
        <span key={index} className="grid-row ">
          {open[index] ? (
            <span  className="text-bold ">
              <Button
                aria-label={`Collapse ${item[1]}`}
                className="bg-base-lighter text-black"
                onClick={() => tableState(index, false)}
                epa-testid="collapseBTN"
                id="collapseBTN"
              >
                <KeyboardArrowUpSharp />
              </Button>
              {item[1]}
            </span >
          ) : (
            <span  className="text-bold">
              <Button
                aria-label={`Expand ${item[1]}`}
                epa-testid="expandBTN"
                id="expandBTN"
                className="bg-base-lighter text-black"
                onClick={() => tableState(index, true)}
              >
                <KeyboardArrowDownSharp />
              </Button>
              {item[1]}
            </span >
          )}
          {open[index] ? (
            <span className=" ">
              {item[0]} {" "}
            </span>
          ) : (
            ""
          )}
        </span>
      ))}
    </div>
  );
};

export default CustomAccordion;
