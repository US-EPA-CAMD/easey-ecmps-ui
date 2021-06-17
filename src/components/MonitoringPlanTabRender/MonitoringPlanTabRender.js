import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import AccordionItemTitle from "../AccordionItemTitle/AccordionItemTitle";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import Tables from "../Tables/Tables";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";

import "./MonitoringPlanTabRender.scss";

export const MonitoringPlanTabRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setSectionSelect,
  setLocationSelect,
  sectionSelect,
  locationSelect,
  orisCode,
}) => {
  const [matsTableFlag, setMatsTableFlag] = useState(false);
  // // MONITORING METHODS

  const matsTableHandler = (flag) => {
    setMatsTableFlag(flag);
  };
  useEffect(() => {
    if (matsTableFlag) {
      supItems[0] = {
        title: <AccordionItemTitle title="Supplemental Methods" />,
        expanded: true,
        id: "7",
        content: <DataTableMats locationSelect={locationSelect[1]} />,
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const supItems = [];
  const methodItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Methods" />,
      expanded: true,
      id: "5",
      content: (
        <DataTableMethod
          matsTableHandler={matsTableHandler}
          locationSelectValue={parseInt(locationSelect[1])}
          // showActiveOnly={!showInactive}
        />
      ),
    },
  ];
  if (matsTableFlag) {
    supItems.push({
      title: <AccordionItemTitle title="Supplemental Methods" />,
      expanded: false,
      id: "7",
      content: <DataTableMats locationSelect={locationSelect[1]} />,
    });
  }
  // //---------------
  // // MONITORING SYSTEMS

  const systemsItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Systems" />,
      expanded: true,
      id: "2",
      content: <DataTableSystems locationSelect={locationSelect[1]} />,
    },
  ];

  return (
    <div className="selectedMPTab padding-top-4 ">
      {/* on change of select box, it should modify the accordion items */}
      {/* pass back the values to send to the datatable, current is sending back index  */}

      <HeaderInfo
        facility={title}
        selectedConfig={selectedConfig}
        orisCode={orisCode}
        sectionSelect={sectionSelect}
        setSectionSelect={setSectionSelect}
        setLocationSelect={setLocationSelect}
        locationSelect={locationSelect}
        locations={locations}
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
