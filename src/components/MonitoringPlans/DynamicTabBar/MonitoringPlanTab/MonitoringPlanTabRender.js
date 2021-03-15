import React, { useState, useEffect} from "react";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import AccordionItemTitle from "./AccordionItemTitle/AccordionItemTitle";
import "./MonitoringPlanTab.css";
import { Accordion } from "@trussworks/react-uswds";
import DataTableMethod from "./Sections/Methods/DataTableMethod";
import DataTableMats from "./Sections/MATS/DataTableMats";
export const MonitoringPlanTabRender = ({ facility, monitoringPlans, hasActiveConfigs }) => {
  const [locationSelect, setLocationSelect] = useState(0);
  const [matsTableFlag, setMatsTableFlag] = useState(false);
  const [showInactive, setShowInactive] = useState(!hasActiveConfigs);
  useEffect(() => {
    setShowInactive(!hasActiveConfigs); //Calling setter here to update
  }, [hasActiveConfigs]);

  const sections = [
    { name: "Monitoring Methods" },
    { name: "Location Attributes" },
    { name: "Reporting Frequency" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
    { name: "Monitoring Systems" },
    { name: "Monitoring Defaults" },
    { name: "Span, Range, and Formulas" },
    { name: "Rectangular Duct WAFs" },
    { name: "Loads" },
    { name: "Qualifications" },
  ];
  const methodLocationHandler = (location) => {
    setLocationSelect(location);
  };

  const matsTableHandler = (flag) => {
    setMatsTableFlag(flag);

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
  const showInactiveHandler = (value) =>{
    setShowInactive(value)
  }
  return (
    <div className="selectedMPTab">
      {/* on change of select box, it should modify the accordion items */}
      <HeaderInfo
        facility={facility}
        monitoringPlans={monitoringPlans}
        sections={sections}
        methodLocationHandler={methodLocationHandler}
        showInactiveHandler= {showInactiveHandler}
        showInactive={showInactive}
        hasActiveConfigs={hasActiveConfigs}
      />
      <hr width="100%" align="center" />
      <Accordion bordered={false} items={methodItems} className="accordions" />
      <hr width="100%" align="center" />
      {matsTableFlag ? <Accordion bordered={true} items={supItems} className="accordions" /> :'' }
      <hr width="100%" align="center" />
    </div>
  );
};

export default MonitoringPlanTabRender;
