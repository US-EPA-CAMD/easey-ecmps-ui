import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SelectBox from "./SelectBox/SelectBox";
// import { AccordionItem, Accordion } from "@trussworks/react-uswds";
const HeaderInfo = ({ facility, monitoringPlans }) => {
  const [monitoringPlanSelect, setMonitoringPlanSelect] = useState(0);
  const [monitoringSectionSelect, setMonitoringSectionSelect] = useState(0);
  const [
    monitoringPlanLocationSelect,
    setMonitoringPlanLocationSelect,
  ] = useState(0);
  const monitoringPlanSections = [
    { name: "Location Attributes" },
    { name: "Reporting Frequency" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
    { name: "Monitoring Methods" },
    { name: "Monitoring Systems" },
    { name: "Monitoring Defaults" },
    { name: "Span, Range, and Formulas" },
    { name: "Rectangular Duct WAFs" },
    { name: "Loads" },
    { name: "Qualifications" },
  ];
  const mpHandler = (index) => {
    setMonitoringPlanSelect(index);
  };
  const mplHandler = (index) => {
    setMonitoringPlanLocationSelect(index);
  };
  const mpsHandler = (index) => {
    setMonitoringSectionSelect(index);
  };
  // useEffect(() => {
  // }, [monitoringPlanSelect]);
  var test = (
    <SelectBox
      caption="Monitoring Plan"
      options={monitoringPlans}
      mpHandler={mpHandler}
      selectKey="name"
    />
  );
  return (
    <div className="header">
      {/* <Accordion
        items={[<AccordionItem title="test" content={test} expanded id="2" />]}
      >
        {" "}
      </Accordion> */}
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
              caption="Monitoring Plan"
              options={monitoringPlans}
              mpHandler={mpHandler}
              selectKey="name"
            />
            <SelectBox
              caption="Monitoring Plan Locations"
              options={monitoringPlans[monitoringPlanSelect].locations}
              mpHandler={mplHandler}
              selectKey="name"
            />
            <SelectBox
              caption="Monitoring Plan Sections"
              options={monitoringPlanSections}
              mpHandler={mpsHandler}
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
