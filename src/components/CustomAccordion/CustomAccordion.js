import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@material-ui/icons";
const CustomAccordion = ({ title, table }) => {
  const [open, setOpen] = useState(table.map((item, index) => true));

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
        <div key={index} className="position-relative">
          {open[index] ? (
            <div className="text-bold font-body-xl display-block height-auto">
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
            </div>
          ) : (
            <div className="text-bold font-body-xl display-block height-auto ">
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
            </div>
          )}
          {open[index] ? (
            <div className=" ">
              {item[0]} {" "}
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
