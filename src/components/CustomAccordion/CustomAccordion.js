import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@material-ui/icons";
const CustomAccordion = ({
  headerButtonClickHandler,
  headerButtonText,
  id,
  headingLevel = "h4",
  section,
  tables,
  title,
}) => {
  const [open, setOpen] = useState(tables.map((item, index) => true));

  // updates all tables whenever a location is changed
  const tableState = (index, val) => {
    setOpen(tables.map((item, ind) => (ind === index ? val : open[ind])));
  };

  const Heading = headingLevel;

  return (
    <div id={id}>
      {tables.map((item, index) => (
        <div key={index} className={"clearfix"}>
          <div className="text-bold font-body-xl height-auto display-flex flex-align-center">
            <div>
              {open[index] ? (
                <Button
                  aria-label={`Collapse ${item.title}`}
                  className="bg-base-lighter text-black"
                  onClick={() => tableState(index, false)}
                  epa-testid="collapseBTN"
                  data-testid="collapseBTN"
                  id="collapseBTN"
                >
                  <KeyboardArrowUpSharp />
                </Button>
              ) : (
                <Button
                  aria-label={`Expand ${item.title}`}
                  data-testid="expandBTN"
                  epa-testid="expandBTN"
                  id="expandBTN"
                  className="bg-base-lighter text-black"
                  onClick={() => tableState(index, true)}
                >
                  <KeyboardArrowDownSharp />
                </Button>
              )}
            </div>
            <div>
              <Heading
                className="display-inline"
                epa-testid={`${item.title.split(" ").join("")}`}
              >
                {" "}
                {item.title}
              </Heading>
            </div>
            {headerButtonText && headerButtonText !== "" ? (
              <div className="margin-left-2">
                <Button
                  type="button"
                  data-testid={`rightside-accordion-button-${index}`}
                  title={headerButtonText}
                  onClick={headerButtonClickHandler}
                >
                  {headerButtonText}
                </Button>
              </div>
            ) : null}
          </div>
          {open[index] ? <div className=" ">{item.content} </div> : ""}
          <br />
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
