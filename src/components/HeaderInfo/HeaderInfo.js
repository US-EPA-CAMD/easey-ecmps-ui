import React from "react";
import "./HeaderInfo.scss";
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

  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");

  return (
    <div className="header">
      <div>
        <h3>{facilityMainName}</h3>
      </div>
      <div className="padding-top-0 padding-bottom-3 position-relative top-neg-2">
        <div className="float-left clearfix">
          <div className="text-bold font-body-xl">{facilityAdditionalName}</div>
          <div className="row padding-left-2">
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
        </div>
        <div className="float-right clearfix position-relative top-neg-2 height-5">
          <span>
            <a href="#/" className="margin-right-4 text-bold">
              Comments
            </a>
          </span>
          <span className="border-right-1px border-gray-90">
            <a href="#/" className="margin-right-4 text-bold">
              Reports
            </a>
          </span>
          <Button type="button" className="margin-left-4" outline={true}>
            Evaluate
          </Button>
          <Button type="button" className="" outline={true}>
            Submit
          </Button>
          <div className="text-right padding-right-0">
            <div>
              <span className="text-bold">Evaluation Status: </span>
              <span className="font-body-2xs display-inline-block padding-105">
                {" Passed with no errors "}{" "}
              </span>
            </div>
            <div>
              <span className="text-bold"> Submission Status: </span>
              <span className="font-body-2xs display-inline-block padding-105">
                {" Resubmission required "}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
