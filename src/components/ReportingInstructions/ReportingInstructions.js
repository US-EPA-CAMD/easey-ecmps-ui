import React from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { OpenInNew } from "@material-ui/icons";
import "./ReportingInstructions.scss";

import reportingInstructionsPDF from "./ECMPS Monitoring Plan Reporting Instructions 2021 Q4.pdf";

export const ReportingInstructions = () => {
  const links = [
    {
      name: "Monitoring Plan Reporting Instructions",
      url: reportingInstructionsPDF,
    },
    {
      name: "Part 75 Regulations",
      url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-75?toc=1",
    },
    {
      name: "e-CFR",
      url: "https://www.ecfr.gov/cgi-bin/text-idx?SID=4002e94719ee5632c5970867e3c7e018&mc=true&tpl=/ecfrbrowse/Title40/40cfr75_main_02.tpl",
    },
    {
      name: "MATS",
      url: "https://www.ecfr.gov/cgi-bin/retrieveECFR?gp=&SID=6952010b8924c119705ba2727c050a07&mc=true&n=pt40.16.63&r=PART&ty=HTML#sp40.16.63.uuuuu",
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
                key={`li_${link.name.replace(/ /g, "")}`}
                className="margin-top-1"
              >
                {link.name === "Monitoring Plan Reporting Instructions" ? (
                  <a
                    type="button"
                    unstyled={true}
                    className="usa-button usa-button--unstyled text-primary text-underline no-hover-color-change"
                    href={link.url}
                    role="link"
                    rel={link.name}
                    title={`Download ${link.name}`}
                    key={link.url}
                    id={`${link.name.split(" ").join("")}`}
                    download={
                      "ECMPS Monitoring Plan Reporting Instructions 2021 Q4"
                    }
                  >
                    {link.name} <OpenInNew />
                  </a>
                ) : (
                  <a
                    type="button"
                    unstyled={true}
                    className="usa-button usa-button--unstyled text-primary text-underline no-hover-color-change"
                    href={link.url}
                    role="link"
                    rel={link.name}
                    title={`Go to ${link.name} page`}
                    key={link.url}
                    id={`${link.name.split(" ").join("")}`}
                    target="_blank"
                  >
                    {link.name} <OpenInNew />
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
