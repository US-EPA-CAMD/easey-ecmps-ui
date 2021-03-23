import React, { useState, useEffect } from "react";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import AccordionItemTitle from "./AccordionItemTitle/AccordionItemTitle";
import "./MonitoringPlanTab.css";
import DataTableMethod from "./Sections/Methods/DataTableMethod";
import DataTableMats from "./Sections/MATS/DataTableMats";
import Tables from "./Sections/Tables/Tables";
import DataTableSystems from "./Sections/Systems/DataTableSystems";
export const MonitoringPlanTabRender = ({
  facility,
  monitoringPlans,
  hasActiveConfigs,
}) => {
  // ENTIRE PAGE IS GETTING RERENDERED ON SECTIONS STATE UPDATE

  const [locationSelect, setLocationSelect] = useState(0);
  const [sectionSelect, setSectionsSelect] = useState("Monitoring Methods");
  const [matsTableFlag, setMatsTableFlag] = useState(false);
  const [showInactive, setShowInactive] = useState(!hasActiveConfigs);
  useEffect(() => {
    setShowInactive(!hasActiveConfigs); //Calling setter here to update
  }, [hasActiveConfigs]);

  useEffect(() => {
    setShowInactive(!hasActiveConfigs);
    setSectionsSelect("Monitoring Methods");
    console.log('this is selected', sectionSelect)
  }, [facility]);

  const locationHandler = (location) => {
    setLocationSelect(location);
  };

  const sectionHandler = (section) => {
    // console.log(section, "this is section selected");
    setSectionsSelect(section);
  };
  const showInactiveHandler = (value) => {
    setShowInactive(value);
  };

  // MONITORING METHODS

  const matsTableHandler = (flag) => {
    // setMatsTableFlag(flag);
    setTimeout(() => {
      setMatsTableFlag(flag);
    });
  };

  const supItems = [];
  const methodItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Methods" />,
      expanded: !matsTableFlag,
      id: "5",
      content: (
        <DataTableMethod
          matsTableHandler={matsTableHandler}
          locationSelect={locationSelect}
          showActiveOnly={!showInactive}
        />
      ),
    },
  ];
  if (matsTableFlag) {
    supItems.push({
      title: <AccordionItemTitle title="Supplemental Methods" />,
      expanded: true,
      id: "7",
      content: <DataTableMats locationSelect={locationSelect} />,
    });
  }
  //---------------
  // MONITORING SYSTEMS

  const systemsItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Systems" />,
      expanded: true,
      id: "2",
      content: <DataTableSystems locationSelect={locationSelect} />,
    },
  ];
  const [tableHandler, setTableHandler] = useState(
    <Tables
      sectionSelect={sectionSelect}
      methodItems={methodItems}
      systemsItems={systemsItems}
      supItems={supItems}
      matsTableFlag={matsTableFlag}
    />
  );

  useEffect(() => {
    setTableHandler(
      <Tables
        sectionSelect={sectionSelect}
        methodItems={methodItems}
        systemsItems={systemsItems}
        supItems={supItems}
        matsTableFlag={matsTableFlag}
      />
    );
  }, [sectionSelect, locationSelect]);

  return (
    <div className="selectedMPTab">
      {/* on change of select box, it should modify the accordion items */}
      <HeaderInfo
        facility={facility}
        monitoringPlans={monitoringPlans}
        locationHandler={locationHandler}
        sectionHandler={sectionHandler}
        showInactiveHandler={showInactiveHandler}
        showInactive={showInactive}
        hasActiveConfigs={hasActiveConfigs}
      />
      <Tables
        sectionSelect={sectionSelect}
        methodItems={methodItems}
        systemsItems={systemsItems}
        supItems={supItems}
        matsTableFlag={matsTableFlag}
      />
      <hr width="100%" align="center" />
    </div>
  );
};

export default MonitoringPlanTabRender;
