import React from "react";
import Tabs from "../Common/Tabs/Tabs";
import TabPane from "../Common/Tabs/TabPane";

const DetailTabs = () => {
  return (
    <div>
      <div alt="Facility name" id="facilityName">
        <h3>Selected Facility:</h3>
        <h4>ORIS Code:</h4>
      </div>
      <Tabs initTab="Location">
        <TabPane title="Location">Location Content</TabPane>
        <TabPane title="Contacts">Contacts Content</TabPane>
        <TabPane title="Units">
          <p>Units Content1</p>
          <p>Units Content2</p>
        </TabPane>
        <TabPane title="Monitoring Plans">Monitoring Plans Content</TabPane>
      </Tabs>
    </div>
  );
};

export default DetailTabs;
