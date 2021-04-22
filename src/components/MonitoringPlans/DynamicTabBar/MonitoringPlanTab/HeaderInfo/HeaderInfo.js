import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SelectBox from "./SelectBox/SelectBox";
import { getActiveConfigurations } from "../../../../../utils/selectors/monitoringConfigurations";

const HeaderInfo = ({
  facility,
  sectionHandler,
  monitoringPlans,
  locationHandler,
  showInactiveHandler,
  showInactive,
  hasActiveConfigs,
}) => {
  const [configurations, setConfigurations] = useState(
    showInactive ? monitoringPlans : getActiveConfigurations(monitoringPlans)
  );

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
  const [configSelect, setConfigSelect] = useState(0);

  const mpHandler = (index) => {
    setConfigSelect(index);
    locationHandler(configurations[configSelect].locations[0]["id"]);
  };
  const mplHandler = (index) => {
    locationHandler(configurations[configSelect].locations[index]["id"]);
  };
  const mpsHandler = (index) => {
    sectionHandler(sections[index].name);
  };

  const checkBoxHandler = (evt) => {
    if (evt.target.checked) {
      setConfigurations(monitoringPlans);
      showInactiveHandler(true);
    } else {
      setConfigurations(getActiveConfigurations(monitoringPlans));
      showInactiveHandler(false);
    }
    setConfigSelect(0);
  };
  useEffect(() => {
    mpsHandler(3);
  }, []);
  useEffect(() => {
    setConfigurations(
      showInactive ? monitoringPlans : getActiveConfigurations(monitoringPlans)
    );
  }, [monitoringPlans, showInactive]);

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
      {configurations.length !== 0 ? (
        <div className="row">
          <div className="selects column">
            <div className="configurations-container">
              <SelectBox
                caption="Configurations"
                options={configurations}
                selectionHandler={mpHandler}
                selectKey="name"
                showInactive={showInactive}
              />
              <div className="mpSelect showInactive">
                <input
                  type="checkbox"
                  id="showInactive"
                  name="showInactive"
                  checked={showInactive}
                  disabled={!hasActiveConfigs}
                  onChange={checkBoxHandler}
                />
                <label htmlFor="showInactive"> Show Inactive</label>
              </div>
            </div>
            <SelectBox
              caption="Locations"
              options={configurations[configSelect].locations}
              selectionHandler={mplHandler}
              selectKey="name"
            />
            <SelectBox
              caption="Sections"
              options={sections}
              selectionHandler={mpsHandler}
              selectKey="name"
              initialSelection = {3}
            />
          </div>
          <div className="statuses column">
            <div className="eval">Evaluation Status: </div>
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
