import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SectionDrop from "../SectionDrop/SectionDrop";
// import {
//   getActiveConfigurations,
//   getInActiveConfigurations,
// } from "../../utils/selectors/monitoringConfigurations";
import { connect } from "react-redux";
// import {
//   setSectionSelectionState,
//   setInactiveToggle,
//   setLocationSelectionState,
// } from "../../store/actions/dynamicFacilityTab";
import { setActiveTab } from "../../store/actions/activeTab";
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

  tabs,
  activeTab,
}) => {
console.log('selectedConfig,',selectedConfig)
  // const [sectionSelect, setSectionSelect] = useState(
  //   tabs[activeTab[0]].section
  // );

  // useEffect(() => {
  //   setSectionSelect(tabs[activeTab[0]].section);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tabs[activeTab[0]].section]);
  // useEffect(() => {
  //   setLocationSelect(
  //     tabs[activeTab[0]].location
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


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

const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs,
    activeTab: state.activeTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setSection: (section, orisCode) =>
    //   dispatch(setSectionSelectionState(section, orisCode)),
    // setInactive: (orisCode, value) =>
    //   dispatch(setInactiveToggle(orisCode, value)),
    // setLocation: (location, orisCode) =>
    //   dispatch(setLocationSelectionState(location, orisCode)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderInfo);
