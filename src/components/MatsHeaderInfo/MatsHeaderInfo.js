import React from "react";
import { connect, useSelector } from "react-redux";

import { MATS_REPORT_TYPE_CODES_STORE_NAME } from "../../additional-functions/data-table-section-and-store-names";
import { MATS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import HeaderInfoCheckoutButton from "../HeaderInfoCheckoutButton/HeaderInfoCheckoutButton";
import HeaderInfoFacility from "../HeaderInfoFacility/HeaderInfoFacility";
import HeaderInfoLocationSelect from "../HeaderInfoLocationSelect/HeaderInfoLocationSelect";
import MatsCodeSelect from "../MatsCodeSelect/MatsCodeSelect";
import HeaderInfoMatsSubmissionButton from "./HeaderInfoMatsSubmissionButton";

export const MatsHeaderInfo = ({
  canSubmit = false,
  facility,
  orisCode,
  selectedConfigId,
  selectedReportType,
  setSelectedReportType,
  user,

  /* MAPPED PROPS */
  checkedOutConfigs,
}) => {
  const selectedConfig = useSelector((state) =>
    state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId),
  );

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
          {canSubmit && (
            <HeaderInfoMatsSubmissionButton selectedConfig={selectedConfig} />
          )}
        </div>
        <div className="grid-row positon-relative">
          <div className="grid-col-4">
            <HeaderInfoLocationSelect
              allowEmpty
              className="margin-right-2 margin-y-1"
              selectedConfig={selectedConfig}
              workspaceSection={MATS_STORE_NAME}
            />
          </div>
          <div className="grid-col-4">
            <MatsCodeSelect
              className="margin-y-1"
              label="Report Types"
              optionsStoreName={MATS_REPORT_TYPE_CODES_STORE_NAME}
              setValue={setSelectedReportType}
              value={selectedReportType}
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
