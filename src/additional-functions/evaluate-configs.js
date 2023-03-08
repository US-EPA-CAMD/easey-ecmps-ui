import React from "react";
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
  
  export const evalStatusContent = (status) => {
    const alertStyle = `padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
      status
    )} margin-y-0`;
  
    const evalStatusHyperlink = (
      <div className={alertStyle}>
        <button
          className={"hyperlink-btn cursor-pointer"}
          // onClick={() => displayReport("MP_EVAL", orisCode, selectedConfig.id)}
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