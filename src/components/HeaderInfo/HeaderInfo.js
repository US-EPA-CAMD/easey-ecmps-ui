import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SectionDrop from "../SectionDrop/SectionDrop";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { connect } from "react-redux";
import {
  setSectionSelectionState,
  setInactiveToggle,
} from "../../store/actions/dynamicFacilityTab";
import { setActiveTab } from "../../store/actions/activeTab";
import { Button } from "@trussworks/react-uswds";
import ConfigurationsDrop from "../ConfigurationsDrop/ConfigurationsDrop";
import LocationDrop from "../LocationsDrop/LocationsDrop";

const HeaderInfo = ({
  facility,
  monitoringPlans,
  orisCode,
  monitoringPlansState,
  hasActiveConfigs,

  tabs,
  activeTab,
  setSection,
  setConfiguration,
  setInactive,
}) => {
  // // possiblely adding showinactive to redux state will fix this issue
  const [configurations, setConfigurations] = useState(
    hasActiveConfigs
      ? monitoringPlans
      : getInActiveConfigurations(monitoringPlans)
  );

  // by default is there are no active configs, show inactive (need to disable and check the
  //show inactive checkbox )
  useEffect(() => {
    if (!hasActiveConfigs) {
      setConfigurations(getInActiveConfigurations(monitoringPlans));
      // showInactiveHandler(false);
    }
  }, [hasActiveConfigs, monitoringPlans, orisCode]);

  const [inactiveCheck, setInactiveCheck] = useState(
    tabs[activeTab[0]].inactive
  );
  // by default only show active configs first
  useEffect(() => {
    setConfigurations(
      inactiveCheck ? monitoringPlans : getActiveConfigurations(monitoringPlans)
    );
  }, [monitoringPlans, inactiveCheck, orisCode]);

  useEffect(() => {
    setConfigurations(
      tabs[activeTab].inactive
        ? monitoringPlans
        : getActiveConfigurations(monitoringPlans)
    );
  }, [monitoringPlans, tabs[activeTab].inactive]);

  const [sectionSelect, setSectionSelect] = useState(
    tabs[activeTab[0]].section
  );

  useEffect(() => {
    setSectionSelect(tabs[activeTab[0]].section);
  }, [tabs[activeTab[0]].section]);

  useEffect(() => {
    setInactiveCheck(tabs[activeTab[0]].inactive);
  }, [tabs[activeTab[0]].inactive, hasActiveConfigs]);

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
      {monitoringPlansState.length !== 0 ? (
        <div className="row">
          <div className="selects column">
            <div className="configurations-container">
              <ConfigurationsDrop
                caption="Configurations"
                options={configurations}
                selectKey="name"
                initialSelection={0}
                inactiveCheck={inactiveCheck}
                showInactiveHandler={setInactive}
                showInactive={inactiveCheck}
                hasActiveConfigs={hasActiveConfigs}
                orisCode={orisCode}
              />
            </div>
            <LocationDrop
              caption="Locations"
              orisCode={orisCode}
              options={tabs[activeTab[0]].locations}
              selectKey="name"
              initialSelection={tabs[activeTab[0]].location[0]}
            />
            <SectionDrop
              caption="Sections"
              selectionHandler={setSection}
              selectKey="name"
              initialSelection={sectionSelect}
              orisCode={orisCode}
              activeTab={activeTab}
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
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs,
    monitoringPlansState:state.monitoringPlans,
    activeTab: state.activeTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSection: (section, orisCode) =>
      dispatch(setSectionSelectionState(section, orisCode)),
    setInactive: (orisCode, value) =>
      dispatch(setInactiveToggle(orisCode, value)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderInfo);
