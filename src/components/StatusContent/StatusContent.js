import { Alert } from "@trussworks/react-uswds";
import React from "react";

import { DataStatus } from "../../utils/constants/dataStatus";
import SizedPreloader from "../SizedPreloader/SizedPreloader";

export const StatusContent = ({ children, errorMsg = "Error loading data.", headingLevel = "h4", status }) => (
  <>
    {status === DataStatus.PENDING && (
      <div className="display-flex flex-justify-center">
        <SizedPreloader />
      </div>
    )}
    {status === DataStatus.ERROR && (
      <Alert noIcon slim type="error" headingLevel={headingLevel}>
        {errorMsg}
      </Alert>
    )}
    {status === DataStatus.SUCCESS && children}
  </>
);

export default StatusContent;
