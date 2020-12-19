import React, { useState } from "react";
import "./HeaderInfo.css";
import SelectBox from "./SelectBox/SelectBox";
const HeaderInfo = ({
  facility,
  sections,
  monitoringPlans,
  methodLocationHandler,
}) => {

  const [configSelect, setConfigSelect] = useState(0);
  const [sectionSelect, setSectionSelect] = useState(0);

  const [locationSelect, setLocationSelect] = useState(0);

  const mpHandler = (index) => {
    setConfigSelect(index);
    setLocationSelect(0);
    // setLocationOptions(monitoringPlans[monitoringPlanSelect].locations);
  };
  const mplHandler = (index) => {
    methodLocationHandler(
      monitoringPlans[configSelect].locations[index]["id"]
    );
    setLocationSelect(index);
  };
  const mpsHandler = (index) => {
    setSectionSelect(index);
  };

  // let configIndex = monitoringPlans.findIndex((x) => {
  //   return x.name == monitoringPlanSelect;
  // });
  // configIndex = configIndex < 0 ? 0 : configIndex;

  return (
    <div className="header">
      <div className="title">
        <h2>{facility.name}</h2>
      </div>
      <div className="accessories">
        <a href="#/">Comments</a>
        <a href="#/">Reports</a>|<button className="ovalBTN">Evaluate</button>
        <button className="ovalBTN">Submit</button>
      </div>
      {monitoringPlans.length !== 0 ? (
        <div className="row">
          <div className="selects column">
            <SelectBox
              caption="Configurations"
              options={monitoringPlans}
              selectionHandler={mpHandler}
              selectKey="name"
            />
            <SelectBox
              caption="Locations"
              options={monitoringPlans[configSelect].locations}
              // options={monitoringPlans[configIndex].locations}
              //options={monitoringLocationTest}
              selectionHandler={mplHandler}
              selectKey="name"
            />
            <SelectBox
              caption="Sections"
              options={sections}
              selectionHandler={mpsHandler}
              selectKey="name"
            />
          </div>
          <div className="statuses column">
            <div className="eval">Evaluation Status: </div>{" "}
            <div className="answer">{" Passed with no errors "} </div>
            <br />
            <div className="submission"> Submission Status: </div>
            <div className="answer">{" Resubmission required "} </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderInfo;
