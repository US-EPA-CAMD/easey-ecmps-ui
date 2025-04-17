import { Alert } from "@trussworks/react-uswds";
import React from "react";

import { dataStatus } from "../../utils/constants/dataStatus";
import SizedPreloader from "../SizedPreloader/SizedPreloader";

export const StatusContent = ({ children, headingLevel = "h4", label, status }) => (
  <>
    {status === dataStatus.PENDING && (
      <div className="display-flex flex-justify-center">
        <SizedPreloader />
      </div>
    )}
    {status === dataStatus.ERROR && (
      <Alert noIcon slim type="error" headingLevel={headingLevel}>
        Error loading {label}.
      </Alert>
    )}
    {status === dataStatus.SUCCESS && children}
  </>
);

export default StatusContent;
