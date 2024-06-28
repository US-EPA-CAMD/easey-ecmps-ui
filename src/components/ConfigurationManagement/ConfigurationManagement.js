import React, { useEffect } from "react";

import { configurationManagementTitle } from "../../utils/constants/moduleTitles";

export const ConfigurationManagement = ({}) => {
  useEffect(() => {
    document.title = configurationManagementTitle;
  }, []);
  return (
    <div className="react-transition fade-in padding-x-3">
      <h2 className="page-header margin-top-2">Configuration Management</h2>
    </div>
  );
};

export default ConfigurationManagement;
