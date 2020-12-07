import React, { useState, useEffect, useRef } from "react";
import DataTable from "./SelectFacilitiesTab/DataTable";

import SelectedFacilityTab from "./SelectedFacilityTab/SelectedFacilityTab";
import DynamicTabBarRender from "./DynamicTabBarRender";

const DynamicTabBar = () => {
  const initialRender = useRef(true);
  const [orisCode, setOrisCode] = useState(3);

  // everytime an open tab is clicked,
  // the new tab is updated
  const viewDataHandler = (info) => {
    const newFacility = {
      title: info[1].value,
      component: (
        <div className="selectedTabsBox">
          <SelectedFacilityTab orisCode={info[0].value} />
        </div>
      ),
    };
    setNewTab(newFacility);
  };

  // SELECTED facility tab ( ADDITIONAL tab )
  const [newTab, setNewTab] = useState([]);

  // when a new tab is updated, it updates the total tabs via usestate
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setTotalTabs([...totalTabs, newTab]);
      }
    
  }, [newTab]);

  //
  const [totalTabs, setTotalTabs] = useState([
    {
      title: "Select Facility",
      component: (
        <div className="tabsBox">
          <DataTable
            selectedRowHandler={(facilityId) => {
              setOrisCode(facilityId);
            }}
            viewDataHandler={viewDataHandler}
          />
        </div>
      ),

    },
  ]);

  return (
    <div>
      <DynamicTabBarRender totalTabs={totalTabs} />
    </div>
  );
};

export default DynamicTabBar;
