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

  const additionalResources = [
    {
      name: "CDX",
      url: "https://cdx.epa.gov/",
      type: "external",
    },
    {
      name: "Tutorials",
      url: "/tutorials",
      type: "internal",
    },
  ];

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in resources-container">
      <div className="grid-row">
        <h2 className="text-bold font-heading-2xl">Resources</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
      </div>
      <div className="grid-row">
        <div className="padding-top-2 padding-bottom-2 desktop:grid-col-6 desktop-lg:grid-col-4 mobile-lg:grid-col-12 padding-right-3">
          <h3 className="text-bold font-heading-xl">Glossary</h3>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            fringilla massa in lectus volutpat scelerisque. Cras eu leo vel
            lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium
            laoreet.
          </div>
          <USWDSLink
            className="usa-button usa-button--outline margin-top-1 margin-left-05"
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
            id={"Glossary"}
          >
            Visit The Glossary
          </USWDSLink>
        </div>
        );
      </div>
      <div className="margin-top-2">
        <h2 className="text-bold font-heading-2xl">Additional Resources</h2>
        <p>
          {" "}
          Examine she brother prudent add day ham. Far stairs now coming bed
          oppose hunted become his. You zealously departure had procuring
          suspicion. Books who{" "}
        </p>
      </div>

      <ul className="margin-0 padding-0 margin-left-3">
        {additionalResources.map((resource) => {
          return (
            <li
              key={`li_${resource.name.replace(/ /g, "")}`}
              className="margin-top-1"
            >
              {resource.type === "external" ? (
                <a
                  className="text-primary text-underline no-hover-color-change"
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
                  className="text-primary text-underline no-hover-color-change"
                  to={resource.url}
                  role="link"
                  rel={resource.name}
                  title={`Go to ${resource.name} page`}
                  key={resource.url}
                  id={`${resource.name.split(" ").join("")}`}
                >
                  {resource.name} <OpenInNew />
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
