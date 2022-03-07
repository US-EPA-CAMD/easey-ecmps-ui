import React, { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getContent } from "../../utils/api/contentApi";

import { Link as USWDSLink } from "@trussworks/react-uswds";
import { Link } from "react-router-dom";
import Login from "../Login/Login";

import "./AboutHome.scss";
const AboutHome = ({ user, setCurrentLink }) => {
  const [mainContent, setMainContent] = useState();
  const [emissionsContent, setEmissionsContent] = useState();
  const [whatIsNewContent, setWhatIsNewContent] = useState();
  const [monitorPlanContent, setMonitorPlanContent] = useState();
  const [qaCertificationContent, setQACertificationContent] = useState();

  useEffect(() => {
    document.title = "ECMPS Home";

    getContent("/ecmps/home/index.md").then((resp) =>
      setMainContent(resp.data)
    );
    getContent("/ecmps/home/emissions.md").then((resp) =>
      setEmissionsContent(resp.data)
    );
    getContent("/ecmps/home/what-is-new.md").then((resp) =>
      setWhatIsNewContent(resp.data)
    );
    getContent("/ecmps/home/monitoring-plans.md").then((resp) =>
      setMonitorPlanContent(resp.data)
    );
    getContent("/ecmps/home/qa-certifications.md").then((resp) =>
      setQACertificationContent(resp.data)
    );
  }, []);

  const handleRouteChange = (event, url) => {
    setCurrentLink(url);
  };

  return (
    <div className="grid-row padding-top-7 padding-2 react-transition fade-in aboutHome">
      <div className="grid-col-9 fit-content">
        <ReactMarkdown
          className="main-content"
          children={mainContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        />
        <ReactMarkdown
          className="padding-top-2 monitor-plan-content"
          children={monitorPlanContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        />
        <USWDSLink
          className="usa-button viewAboutBTN bg-accent-cool margin-1"
          variant="unstyled"
          asCustom={Link}
          to="/monitoring-plans"
          role="link"
          exact="true"
          rel="Monitoring Plans"
          title="Go to Monitoring Plans page"
          key="monitoring-plans"
          id="monitoringPlansBtn"
          onClick={(event) => handleRouteChange(event, "/monitoring-plans")}
        >
          View Monitoring Plans
        </USWDSLink>
        <ReactMarkdown
          className="padding-top-2 qa-certification-content"
          children={qaCertificationContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        />
        <USWDSLink
          className="usa-button viewAboutBTN bg-accent-cool margin-1"
          variant="unstyled"
          asCustom={Link}
          to="/qa-certifications"
          role="link"
          exact="true"
          rel="QA & Certifications"
          title="Go to QA & Certifications page"
          key="qa-certifications"
          id="qaCertificationsBtn"
          onClick={(event) => handleRouteChange(event, "/qa-certifications")}
        >
          View QA & Certifications
        </USWDSLink>
        <ReactMarkdown
          className="padding-top-2 emissions-content"
          children={emissionsContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        />
        <USWDSLink
          className="usa-button viewAboutBTN bg-accent-cool margin-1"
          variant="unstyled"
          asCustom={Link}
          to="/emissions"
          role="link"
          exact="true"
          rel="Emissions"
          title="Go to Emissions page"
          key="emissions"
          id="emissionsBtn"
          onClick={(event) => handleRouteChange(event, "/emissions")}
        >
          View Emissions Data
        </USWDSLink>
      </div>
      <div className="grid-col-3 float-right padding-2">
        <div className="box border-1px">
          <div className="title text-white text-center padding-y-2">
            What's New
          </div>
          <div className="padding-2">
            <ReactMarkdown
              children={whatIsNewContent}
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <USWDSLink
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}
            />
          </div>
        </div>

        <div className="bg-base-lighter" data-testid="homeLogIn">
          {!user ? <Login isModal={false} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
