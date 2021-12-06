import React from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { OpenInNew } from "@material-ui/icons";
import "./ReportingInstructions.scss";

import reportingInstructionsPDF from "./ECMPS Monitoring Plan Reporting Instructions 2021 Q4.pdf";
import monitoringPlanJSON from "./monitoring-plan-json-format.json";

export const ReportingInstructions = () => {
  const createJsonFile = (url) => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(url, null, "\t"));
    return dataStr;
  };

  const createFileName = (type, name) => {
    if (type === "json") {
      return name + ".json";
    } else if (type === "pdf") {
      return name;
    }
    return "fix-createFileName-function";
  };

  const links = [
    {
      linkName: "Monitoring Plan Reporting Instructions",
      url: reportingInstructionsPDF,
      fileDownload: true,
      fileType: "pdf",
      fileName: "ECMPS Monitoring Plan Reporting Instructions 2021 Q4",
    },
    {
      linkName: "Monitoring Plan - JSON Format",
      url: monitoringPlanJSON,
      fileDownload: true,
      fileType: "json",
      fileName: "ECMPS Monitoring Plan - JSON Format",
    },
    {
      linkName: "Monitoring Plan - Swagger Page",
      url: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/swagger/#/Plans%20%26%20Configurations/MonitorPlanWorkspaceController_importPlan",
      fileDownload: false,
    },
    {
      linkName: "Part 75 Regulations",
      url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-75?toc=1",
      fileDownload: false,
    },
    {
      linkName: "e-CFR",
      url: "https://www.ecfr.gov/cgi-bin/text-idx?SID=4002e94719ee5632c5970867e3c7e018&mc=true&tpl=/ecfrbrowse/Title40/40cfr75_main_02.tpl",
      fileDownload: false,
    },
    {
      linkName: "MATS",
      url: "https://www.ecfr.gov/cgi-bin/retrieveECFR?gp=&SID=6952010b8924c119705ba2727c050a07&mc=true&n=pt40.16.63&r=PART&ty=HTML#sp40.16.63.uuuuu",
      fileDownload: false,
    },
  ];

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-row">
        <h2 className="text-bold font-heading-2xl">Reporting Instructions</h2>
      </div>
      <div className="grid-row">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          semper quam quis tellus posuere, pellentesque ornare nulla
          sollicitudin. Praesent eleifend scelerisque enim vel porta. Fusce
          sollicitudin nec massa quis porta. Sed in malesuada dui. In in tortor
          arcu. Sed eleifend sit amet felis ut malesuada. Nulla quis lobortis
          nisl, et lobortis erat.
        </p>
        <ul className="margin-0 padding-0 margin-left-3">
          {links.map((link) => {
            return (
              <li
                key={`li_${link.linkName.replace(/ /g, "")}`}
                className="margin-top-1"
              >
                {link.fileDownload ? (
                  <a
                    type="button"
                    unstyled={true}
                    className="usa-button usa-button--unstyled text-primary text-underline no-hover-color-change"
                    href={
                      link.fileType === "json"
                        ? createJsonFile(link.url)
                        : link.url
                    }
                    rel={link.linkName}
                    title={`Download ${link.name}`}
                    key={link.url}
                    id={`${link.linkName.split(" ").join("")}`}
                    download={createFileName(link.fileType, link.fileName)}
                  >
                    {link.linkName} <OpenInNew />
                  </a>
                ) : (
                  <a
                    type="button"
                    unstyled={true}
                    className="usa-button usa-button--unstyled text-primary text-underline no-hover-color-change"
                    href={link.url}
                    rel={link.linkName}
                    title={`Go to ${link.linkName} page`}
                    key={link.url}
                    id={`${link.linkName.split(" ").join("")}`}
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank"
                  >
                    {link.linkName} <OpenInNew />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReportingInstructions;
