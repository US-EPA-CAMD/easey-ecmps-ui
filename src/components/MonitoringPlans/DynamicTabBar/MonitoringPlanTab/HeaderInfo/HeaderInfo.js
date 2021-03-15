import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SelectBox from "./SelectBox/SelectBox";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../../../../utils/selectors/monitoringConfigurations";

const HeaderInfo = ({
  facility,
  sections,
  monitoringPlans,
  methodLocationHandler,
  activeMethodsHandler,
}) => {
  const hasActiveConfigs =
    getActiveConfigurations(monitoringPlans).length > 0 ? true : false;

  const [configurations, setConfigurations] = useState({
    list: hasActiveConfigs
      ? getActiveConfigurations(monitoringPlans)
      : getInActiveConfigurations(monitoringPlans),
    showInactive: !hasActiveConfigs,
  });

  const [configSelect, setConfigSelect] = useState(0);

  const mpHandler = (index) => {
    setConfigSelect(index);
  };
  const mplHandler = (index) => {
    methodLocationHandler(
      configurations.list[configSelect].locations[index]["id"]
    );
  };
  const mpsHandler = (index) => {
    console.log(index);
  };

  const checkBoxHandler = (evt) => {
    if (evt.target.checked) {
      setConfigurations({
        ...configurations,
        list: monitoringPlans,
        showInactive: true,
      });
      activeMethodsHandler(false);
    } else {
      setConfigurations({
        ...configurations,
        list: getActiveConfigurations(monitoringPlans),
        showInactive: false,
      });
      activeMethodsHandler(true);
    }
    setConfigSelect(0);
  };
  useEffect(() => {
    //setConfigurations({list: getActiveConfigurations(monitoringPlans), showInactive:false});
    setConfigurations({
      list: hasActiveConfigs
        ? getActiveConfigurations(monitoringPlans)
        : getInActiveConfigurations(monitoringPlans),
      showInactive: !hasActiveConfigs,
    });
  }, [monitoringPlans]);

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
      {configurations.list.length !== 0 ? (
        <div className="row">
          <div className="selects column">
            <div className="configurations-container">
              <SelectBox
                caption="Configurations"
                options={configurations.list}
                selectionHandler={mpHandler}
                selectKey="name"
                showInactive={configurations.showInactive}
              />
              <div className="mpSelect showInactive">
                <input
                  type="checkbox"
                  id="showInactive"
                  name="showInactive"
                  checked={configurations.showInactive}
                  disabled={!hasActiveConfigs}
                  onChange={checkBoxHandler}
                />
                <label htmlFor="showInactive"> Show Inactive</label>
              </div>
            </div>
            <SelectBox
              caption="Locations"
              //options={configurations.showInactive? configurations.list[configSelect].locations : getActiveLocations(configurations.list[configSelect].locations)}
              options={configurations.list[configSelect].locations}
              selectionHandler={mplHandler}
              selectKey="name"
              //showInactive={configurations.showInactive}
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
