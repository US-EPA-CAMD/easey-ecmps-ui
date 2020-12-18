import React, { useState } from "react";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import AccordionItemTitle from "./AccordionItemTitle/AccordionItemTitle";
import "./MonitoringPlanTab.css";
import { Accordion } from "@trussworks/react-uswds";
import DataTableMethod from "./Sections/Methods/DataTableMethod";
const MonitoringPlanTabRender = ({ facility, monitoringPlans }) => {
  const [locationSelect, setLocationSelect] = useState(0);

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

  const methodItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Methods" />,
      expanded: true,
      id: "5",
      content: <DataTableMethod locationSelect={locationSelect} />,
      handleToggle: true,
    },
  ];

  const supItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Supplemental Methods" />,
      expanded: false,
      id: "7",
      // content: ,
    },
  ];

  return (
    <div className="selectedMPTab">
      {/* on change of select box, it should modify the accordion items */}
      <HeaderInfo
        facility={facility}
        monitoringPlans={monitoringPlans}
        sections={sections}
        methodLocationHandler={methodLocationHandler}
      />
      <hr width="100%" align="center" />
      <Accordion bordered={false} items={methodItems} className="accordions" />
      <hr width="100%" align="center" />
      {/* <AccordionItemTitle title="Supplemental Method" /> */}
      <Accordion bordered={true} items={supItems} className="accordions" />
      <hr width="100%" align="center" />
    </div>
  );
};

export default MonitoringPlanTabRender;
