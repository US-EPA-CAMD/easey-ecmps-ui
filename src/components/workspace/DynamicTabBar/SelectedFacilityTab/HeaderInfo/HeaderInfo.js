import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SelectBox from "./SelectBox/SelectBox";
const HeaderInfo = ({ facility, monitoringPlans }) => {

  const [monitoringPlanSelect, setMonitoringPlanSelect] = useState(0);
  const [
    monitoringPlanLocationSelect,
    setMonitoringPlanLocationSelect,
  ] = useState(0);

  const mpHandler = (index) => {
    setMonitoringPlanSelect(index);
  };
  const mplHandler = (index) => {
    setMonitoringPlanLocationSelect(index);
  };
  // useEffect(() => {
  // }, [monitoringPlanSelect]);

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
        <div className="selects">
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
          {/* <SelectBox caption="Monitoring Plan Sections" /> */}

          <div className="statuses">

              <div className="eval">Evaluation Status: </div>  <div className='answer'>{" Passed with no errors "} </div>
              <br/>
            <div className="submission"> Submission Status: </div><div className='answer'>{" Resubmission required "} </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderInfo;
