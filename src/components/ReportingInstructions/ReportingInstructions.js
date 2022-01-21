import React from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { OpenInNew } from "@material-ui/icons";
import "./ReportingInstructions.scss";
import config from "../../config";

import reportingInstructionsPDF from "./ECMPS Monitoring Plan Reporting Instructions 2021 Q4.pdf";
import monitoringPlanJSON from "./monitoring-plan-json-format.json";

export const ReportingInstructions = () => {
  const createJsonFile = (url) => {
    return (
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(url, null, "\t"))
    );
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
      url: `${config.services.monitorPlans.uri}/swagger`,
      fileDownload: false,
    },
    {
      linkName: "Part 75 Regulations",
      url: `${config.app.partSeventyFiveRegulationsBaseUrl}${config.app.partSeventyFiveRegulationsPath}`,
      fileDownload: false,
    },
    {
      linkName: "e-CFR",
      url: `${config.app.ecfrBaseUrl}${config.app.ecfrPath}`,
      fileDownload: false,
    },
    {
      linkName: "MATS",
      url: `${config.app.matsBaseUrl}${config.app.matsPath}`,
      fileDownload: false,
    },
  ];

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in reporting-instructions">
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
                    className="text-primary text-underline no-hover-color-change"
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
                    className="text-primary text-underline no-hover-color-change"
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
