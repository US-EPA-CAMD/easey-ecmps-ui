import React, { useEffect, useState } from "react";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import { OpenInNew } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Resources.scss";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getContent } from "../../utils/api/contentApi";

export const Resources = () => {
  const [mainContent, setMainContent] = useState();
  const [glossaryContent, setGlossaryContent] = useState();
  const [reportingInsContent, setReportingInsContent] = useState();
  const [camApiContent, setCamApiContent] = useState();
  const [additionalResContent, setAdditionalResContent] = useState();
  const [resourcesLinks, setResourcesLinks] = useState([]);

  useEffect(() => {
    document.title = "ECMPS Resources";

    getContent("/ecmps/resources/index.md").then((resp) =>
      setMainContent(resp.data)
    );
    getContent("/ecmps/resources/glossary.md").then((resp) =>
      setGlossaryContent(resp.data)
    );
    getContent("/ecmps/resources/reporting-instructions.md").then((resp) =>
      setReportingInsContent(resp.data)
    );
    getContent("/ecmps/resources/cam-api.md").then((resp) =>
      setCamApiContent(resp.data)
    );
    getContent("/ecmps/resources/additional-resources.md").then((resp) =>
      setAdditionalResContent(resp.data)
    );
    getContent("/ecmps/resources/resources-links.json").then((resp) =>
      setResourcesLinks(resp.data)
    );
  }, []);

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in resources-container">
      <div className="grid-row">
        <ReactMarkdown
          className="main-content"
          children={mainContent}
          remarkPlugins={[remarkGfm]}
        />
      </div>
      <div className="grid-row">
        <div className="padding-top-2 padding-bottom-2 desktop:grid-col-6 desktop-lg:grid-col-4 mobile-lg:grid-col-12 padding-right-3">
          <ReactMarkdown
            className="glossary-content"
            children={glossaryContent}
            remarkPlugins={[remarkGfm]}
          />
          <USWDSLink
            className="usa-button usa-button--outline margin-top-1 margin-left-05 "
            outline="true"
            type="button"
            variant="unstyled"
            asCustom={Link}
            to="/glossary"
            role="link"
            exact="true"
            rel="Glossary"
            title="Go to Glossary page"
            key="/glossary"
            id={"glossary-link"}
          >
            Visit The Glossary
          </USWDSLink>
        </div>
        <div className="padding-top-2 padding-bottom-2 desktop:grid-col-6 desktop-lg:grid-col-4 mobile-lg:grid-col-12 padding-right-3">
          <ReactMarkdown
            className="reporting-instructions-content"
            children={reportingInsContent}
            remarkPlugins={[remarkGfm]}
          />
          <USWDSLink
            className="usa-button usa-button--outline margin-top-1 margin-left-05"
            outline="true"
            type="button"
            variant="unstyled"
            asCustom={Link}
            to="/reporting-instructions"
            role="link"
            exact="true"
            rel="Reporting Instructions"
            title="Go to Reporting Instructions page"
            key="/reporting-instructions"
            id={"reporting-instructions-link"}
          >
            Visit Reporting Instructions
          </USWDSLink>
        </div>
        <div className="padding-top-2 padding-bottom-2 desktop:grid-col-6 desktop-lg:grid-col-4 mobile-lg:grid-col-12 padding-right-3">
          <ReactMarkdown
            className="cam-api-content"
            children={camApiContent}
            remarkPlugins={[remarkGfm]}
          />
          <USWDSLink
            className="usa-button usa-button--outline margin-top-1 margin-left-05"
            outline="true"
            type="button"
            variant="unstyled"
            asCustom={Link}
            to="/cam-api"
            role="link"
            exact="true"
            rel="CAM API"
            title="Go to CAM API page"
            key="/cam-api"
            id={"cam-api-link"}
          >
            Visit CAM API
          </USWDSLink>
        </div>
      </div>
      <div className="margin-top-2">
        <ReactMarkdown
          className="additional-resources-content"
          children={additionalResContent}
          remarkPlugins={[remarkGfm]}
        />
      </div>

      <ul className="margin-0 padding-0 margin-left-3">
        {resourcesLinks.map((resource) => {
          return (
            <li
              key={`li_${resource.name.replace(/ /g, "")}`}
              className="margin-top-1"
            >
              {resource.type === "external" ? (
                <a
                  className="text-primary text-underline no-hover-color-change forceUnderlineText colorContrast"
                  href={resource.url}
                  title={`Go to ${resource.name} page`}
                  key={resource.url}
                  id={`${resource.name.split(" ").join("")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name} <OpenInNew />
                </a>
              ) : (
                <Link
                  type="button"
                  unstyled={true}
                  className="text-primary text-underline no-hover-color-change forceUnderlineText colorContrast"
                  to={resource.url}
                  role="link"
                  rel={resource.name}
                  title={`Go to ${resource.name} page`}
                  key={resource.url}
                  id={`${resource.name.split(" ").join("")}`}
                >
                  {resource.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Resources;
