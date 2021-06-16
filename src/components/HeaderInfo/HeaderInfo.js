import React from "react";
import "./HeaderInfo.css";
import SectionDrop from "../SectionDrop/SectionDrop";

import { Button } from "@trussworks/react-uswds";
import LocationDrop from "../LocationsDrop/LocationsDrop";

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

  return (
    <div className="header">
      <div className="display-inline-block">
        <h2>{facility.name}</h2>
      </div>
      <div className="float-right">
        <a href="#/">Comments</a>
        <a href="#/">Reports</a>|<Button className="ovalBTN">Evaluate</Button>
        <Button className="ovalBTN">Submit</Button>
      </div>
        <div className="row">
          <div className="selects column">
            <LocationDrop
              caption="Locations"
              orisCode={orisCode}
              options={locations}
              selectKey="name"
              initialSelection={locationSelect}
              selectionHandler={setLocationSelect}
            />
            <SectionDrop
              caption="Sections"
              selectionHandler={setSectionSelect}
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

export default (HeaderInfo);
