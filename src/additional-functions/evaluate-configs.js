import React from "react";
import { displayReport } from "../utils/functions";
// chooses correctly styling for evaluation status label
const evalStatusStyle = (status) => {
    switch (status) {
      case "ERR":
        return "usa-alert--error";
      case "EVAL":
        return "usa-alert--warning";
      case "INFO":
      case "PASS":
        return "usa-alert--success";
      case "WIP":
        return "usa-alert--info";
      default:
        break;
    }
    return "";
  };
  
  // returns evaluation status (full text) from code
  const evalStatusText = (status) => {
    switch (status) {
      case "ERR":
        return "Crt Errors";
      case "INFO":
        return "Informational Message";
      case "PASS":
        return "Passed";
  
      case "EVAL":
        return "Eval";
      default:
        break;
    }
    return "Needs Evaluation";
  };
  
  export const evalStatusContent = (status, orisCode, id) => {
    const alertStyle = `padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
      status
    )} margin-y-0`;
    const params = {
      reportCode: "TEST_EVAL",
      facilityId: orisCode,
      testId: id
    }
    const evalStatusHyperlink = (
      <div className={alertStyle}>
        <button
          className={"hyperlink-btn cursor-pointer"}
          onClick={() => displayReport(params)}
        >
          {evalStatusText(status)}
        </button>
      </div>
    );
  
    if (showHyperLink(status)) {
      return evalStatusHyperlink;
    } else {
      return <p className={alertStyle}>{evalStatusText(status)}</p>;
    }
  };
  
  const showHyperLink = (status) => {
    return status === "PASS" || status === "INFO" || status === "ERR" || status === "EVAL";
  };