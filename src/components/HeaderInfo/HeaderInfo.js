import React from "react";
import "./HeaderInfo.css";
import DropdownSelection from "../DropdownSelection/DropdownSelection";

import { Button } from "@trussworks/react-uswds";
const HeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  setSectionSelect,
  sectionSelect,
  setLocationSelect,
  locationSelect,
  locations,
}) => {
  const sections = [
    { name: "Loads" },
    { name: "Location Attributes" },
    { name: "Monitoring Defaults" },
    { name: "Monitoring Methods" },
    { name: "Monitoring Systems" },
    { name: "Qualifications" },
    { name: "Rectangular Duct WAFs" },
    { name: "Reporting Frequency" },
    { name: "Span, Range, and Formulas" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
  ];

  const sectionHandler = (selectedArray) => {
    setSectionSelect(selectedArray[0]);
  };
  return (
    <div className="header">
      <div >
        <h3>{facility}</h3>
      </div>
      <div className="float-right">
        <a href="#/">Comments</a>
        <a href="#/">Reports</a>|<Button className="ovalBTN">Evaluate</Button>
        <Button className="ovalBTN">Submit</Button>
      </div>
      <div className="row">
        <div className="selects column">
          <DropdownSelection
            caption="Locations"
            orisCode={orisCode}
            options={locations}
            viewKey="name"
            selectKey="id"
            initialSelection={locationSelect[0]}
            selectionHandler={setLocationSelect}
          />
          <DropdownSelection
            caption="Sections"
            selectionHandler={sectionHandler}
            options={sections}
            viewKey="name"
            selectKey="name"
            initialSelection={sectionSelect}
            orisCode={orisCode}
          />
        </div>
        <div className="statuses column">
          <div className="eval">Evaluation Status: </div>
          <div className="font-body-2xs display-inline-block padding-105">
            {" Passed with no errors "}{" "}
          </div>
          <br />
          <div className="submission"> Submission Status: </div>
          <div className="font-body-2xs display-inline-block padding-105">
            {" Resubmission required "}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
