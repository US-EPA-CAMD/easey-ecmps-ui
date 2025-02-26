import React from "react";
import { connect, useSelector } from "react-redux";

import { MATS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import HeaderInfoCheckoutButton from "../HeaderInfoCheckoutButton/HeaderInfoCheckoutButton";
import HeaderInfoFacility from "../HeaderInfoFacility/HeaderInfoFacility";
import HeaderInfoLocationSelect from "../HeaderInfoLocationSelect/HeaderInfoLocationSelect";
import HeaderInfoMatsReportTypeCodeSelect from "./HeaderInfoMatsReportTypeCodeSelect";

export const MatsHeaderInfo = ({
  facility,
  orisCode,
  selectedConfigId,
  user,

  /* MAPPED PROPS */
  checkedOutConfigs,
}) => {
  const selectedConfig = useSelector((state) =>
    state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId)
  );

  const [selectedReportType, setSelectedReportType] = React.useState("");

  return (
    <div className="header QACertHeader ">
      <div className="grid-container width-full clearfix position-relative">
        <div className="grid-row">
          <div className="grid-col-9">
            <HeaderInfoFacility
              checkedOutConfigs={checkedOutConfigs}
              facility={facility}
              selectedConfig={selectedConfig}
              user={user}
            />
          </div>
        </div>
        <div className="grid-row">
          <HeaderInfoCheckoutButton
            checkedOutConfigs={checkedOutConfigs}
            selectedConfig={selectedConfig}
            user={user}
          />
        </div>
        <div className="grid-row positon-relative">
          <div className="grid-col-2">
            <HeaderInfoLocationSelect
              selectedConfig={selectedConfig}
              workspaceSection={MATS_STORE_NAME}
            />
          </div>
          <div className="grid-col-4">
            <HeaderInfoMatsReportTypeCodeSelect
              selected={selectedReportType}
              setSelected={setSelectedReportType}
            />
          </div>{" "}
          <div className="grid-col-3"></div>{" "}
        </div>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    checkedOutConfigs: state.checkedOutLocations,
  };
};

export default connect(mapStateToProps)(MatsHeaderInfo);
