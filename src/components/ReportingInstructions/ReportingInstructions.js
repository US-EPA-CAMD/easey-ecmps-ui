import React, { useState, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { OpenInNew } from "@material-ui/icons";
import "./ReportingInstructions.scss";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getContent } from "../../utils/api/contentApi";

export const ReportingInstructions = () => {
  const [mainContent, setMainContent] = useState();

  useEffect(() => {
    document.title = "ECMPS Reporting Instructions";

    getContent("/ecmps/reporting-instructions/index.md").then((resp) =>
      setMainContent(resp.data)
    );
  }, []);

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in reporting-instructions">
      <div className="grid-row">
        <ReactMarkdown
          className="main-content"
          children={mainContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => {
              return (
                <a
                  className="text-primary text-underline forceUnderlineText colorContrast"
                  href={props.href}
                  rel={props.children[0]}
                  title={`Go to ${props.children[0].replaceAll(
                    " Page",
                    ""
                  )} page`}
                  key={props.href}
                  id={`${props.children[0].split(" ").join("")}`}
                  // eslint-disable-next-line react/jsx-no-target-blank
                  target="_blank"
                >
                  {props.children[0]} <OpenInNew />
                </a>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default ReportingInstructions;
