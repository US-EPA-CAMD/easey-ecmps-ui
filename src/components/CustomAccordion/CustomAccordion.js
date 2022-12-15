import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@material-ui/icons";
const CustomAccordion = ({ title, table, section, headerButtonText, headerButtonClickHandler }) => {
  const [open, setOpen] = useState(table.map((item, index) => true));

  useEffect(() => {
    //closes all dropdowns before rendering new section

    // avoids rendering issues when one sections has more datatables than next sections
    setOpen(table.map((item, index) => false));

    // reopens dropdowns to mimic past expectations
    setTimeout(() => {
      setOpen(table.map((item, index) => true));
    }, 600);
  }, [table, section]);
  // updates all tables whenever a location is changed
  const tableState = (index, val) => {
    setOpen(table.map((item, ind) => (ind === index ? val : open[ind])));
  };
  return (
    <div className="">
      {table.map((item, index) => (
        <div key={index} className={"clearfix"}>
            <div className="text-bold font-body-xl display-block height-auto display-flex">
              <div>
                { open[index] ? (
                    <Button
                      aria-label={`Collapse ${item[1]}`}
                      className="bg-base-lighter text-black"
                      onClick={() => tableState(index, false)}
                      epa-testid="collapseBTN"
                      id="collapseBTN"
                    >
                      <KeyboardArrowUpSharp />
                    </Button>
                  ) : (
                    <Button
                      aria-label={`Expand ${item[1]}`}
                      epa-testid="expandBTN"
                      id="expandBTN"
                      className="bg-base-lighter text-black"
                      onClick={() => tableState(index, true)}
                    >
                      <KeyboardArrowDownSharp />
                    </Button>
                  )
                }
              </div>
              <div className="margin-top-1">
                <h4
                  className="display-inline"
                  epa-testid={`${item[1].split(" ").join("")}`}
                >
                  {" "}
                  {item[1]}
                </h4>
              </div>
              { headerButtonText && headerButtonText !== "" ? (
                <div className="margin-left-2">
                  <Button
                    type="button"
                    title={headerButtonText}
                    onClick={headerButtonClickHandler}
                  >
                    {headerButtonText}
                  </Button>
                </div>
                ) : null 
              }
            </div>
          {open[index] ? <div className=" ">{item[0]} </div> : ""}
          <br />
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
