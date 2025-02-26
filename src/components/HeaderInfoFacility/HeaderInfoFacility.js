import React, { useEffect, useMemo, useState } from "react";
import log from "loglevel";

import * as mpApi from "../../utils/api/monitoringPlansApi";

const defaultRefreshInfo = () => ({
  lastUpdatedBy: "Unknown",
  updateDate: new Date(),
});

const formatDate = (dateString, isUTC = false) => {
  const date = new Date(dateString);
  //HANDLE -1 days from DB dates which are UTC
  const day = isUTC ? date.getDate() + 1 : date.getDate();
  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (day > 9 ? day : "0" + day) +
    "/" +
    date.getFullYear()
  );
};

const getRefreshInfo = async (selectedConfigId) => {
  try {
    const info = await mpApi.getRefreshInfo(selectedConfigId);
    return {
      lastUpdatedBy: info.data.userId,
      updateDate: info.data.updateDate,
    };
  } catch (error) {
    log.error(error);
    return defaultRefreshInfo();
  }
};

const HeaderInfoFacility = ({
  checkedOutConfigs,
  facility,
  selectedConfig,
  user,
}) => {
  const [refresherInfo, setRefresherInfo] = useState(defaultRefreshInfo());

  // Parse apart facility name.
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName =
    facility.split("(")[1].replace(")", "") +
    (selectedConfig?.active ? "" : " Inactive");
  const isCheckedOut = selectedConfig.checkout;
  const currentConfig = checkedOutConfigs.find(
    (config) => config.monPlanId === selectedConfig.id
  );

  // Create audit message for header info
  const auditMessage = useMemo(() => {
    if (!user) return "";

    if (isCheckedOut) {
      return `Currently checked-out by: ${
        currentConfig["checkedOutBy"]
      } ${formatDate(currentConfig["checkedOutOn"])}`;
    } else {
      return `Last updated by: ${refresherInfo?.lastUpdatedBy} ${formatDate(
        refresherInfo?.updateDate,
        true
      )}`;
    }
  }, [currentConfig, isCheckedOut, refresherInfo, user]);

  useEffect(() => {
    getRefreshInfo(selectedConfig.id).then((info) => {
      setRefresherInfo(info);
    });
  }, [selectedConfig]);

  return (
    <>
      <h3
        className="font-body-lg margin-y-0"
        data-testid="facility-name-header"
      >
        {facilityMainName}
      </h3>
      <h3
        className="facility-header-text-cutoff margin-y-0"
        title={facilityAdditionalName}
      >
        {facilityAdditionalName}
      </h3>
      <p className="text-bold font-body-2xs margin-top-0">{auditMessage}</p>
    </>
  );
};

export default HeaderInfoFacility;
