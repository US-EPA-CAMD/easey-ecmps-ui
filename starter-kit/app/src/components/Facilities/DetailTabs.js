import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Tabs from "../Common/Tabs/Tabs";
import TabPane from "../Common/Tabs/TabPane";
import UnitsDataTable from "./Units/UnitsDataTable";
import MonitoringPlanDataTable from "./MonitoringPlan/MonitoringPlanDataTable";
import * as fs from "../../utils/selectors/facilities";

const DetailTabs = ({ facilities, orisCode }) => {
  const [facility, setFacility] = useState();
  useEffect(() => {
    setFacility(fs.getSelectedFacility(orisCode, facilities));
  }, [facilities, orisCode]);

  return (
    <div>
      <div alt="Facility name" id="facilityName">
        <h3>Selected Facility: {facility ? facility.name : ""}</h3>
        <h4>ORIS Code: {orisCode}</h4>
      </div>
      <Tabs initTab="Location">
        <TabPane title="Location">Location Content</TabPane>
        <TabPane title="Contacts">Contacts Content</TabPane>
        <TabPane title="Units">
          <UnitsDataTable facility={facility} />
        </TabPane>
        <TabPane title="Monitoring Plans">
          <MonitoringPlanDataTable facility = {facility}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
  };
};

export default connect(mapStateToProps)(DetailTabs);
