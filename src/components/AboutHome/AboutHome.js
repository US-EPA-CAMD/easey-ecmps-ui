import React, { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Link as USWDSLink } from "@trussworks/react-uswds";
import { Link } from "react-router-dom";
import { resetTabOrder } from "../../utils/functions";
import { config } from "../../config";
import axios from "axios";
import { handleResponse, handleError } from "../../utils/api/apiUtils";
import "./AboutHome.scss";
import {getLoginState} from "../../utils/api/easeyAuthApi";
import { displayAppWarning } from "../../additional-functions/app-error";

const getContent = async (path) => {
  const url = `${config.services.content.uri}${path}`;
  return axios
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};
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

  //Display login warnings for the login initial authorizer user with no responsibilities.
  useEffect(() => {
    //get the current user
    const cdxUser = JSON.parse(localStorage.getItem("ecmps_user"));

    //check if the user has any IA, Sponsor, Submitter or Preparer role(s) with no responsibilities
    if (
      ( cdxUser?.roles?.includes(config.app.initialAuthorizerRole) ||
        cdxUser?.roles?.includes(config.app.sponsorRole) ||
        cdxUser?.roles?.includes(config.app.submitterRole) ||
        cdxUser?.roles?.includes(config.app.preparerRole) ) && 
        Object.keys(cdxUser?.facilities || {}).length === 0)
    {
      //display the warning message on the home page
      const warningMessage = 'You have no facilities for which you are responsible. Please login to CBS to review and add facilities for which you are responsible.';
      displayAppWarning(warningMessage);
    }
  }, [user]);

  const handleRouteChange = (event, url) => {
    setCurrentLink(url);
    setTimeout(() => {
      window.scrollTo(0, 0);
      resetTabOrder();
    });
  };

  const homeButtonsPermission = () => {
    return (
      !user ||
      user?.roles?.includes(config.app.sponsorRole) ||
      user?.roles?.includes(config.app.initialAuthorizerRole) ||
      user?.roles?.includes(config.app.submitterRole) ||
      user?.roles?.includes(config.app.preparerRole)
    );
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
              <USWDSLink
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="forceUnderlineText colorContrast"
              />
            ),
          }}
        />
        <ReactMarkdown
          className="padding-top-2 monitor-plan-content"
          children={monitorPlanContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="forceUnderlineText colorContrast"
              />
            ),
          }}
        />
        {homeButtonsPermission() ? (
          <USWDSLink
            className="usa-button bg-accent-cool margin-1"
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
        ) : (
          ""
        )}
        <ReactMarkdown
          className="padding-top-2 qa-certification-content"
          children={qaCertificationContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="forceUnderlineText colorContrast"
              />
            ),
          }}
        />
        {homeButtonsPermission() ? (
          <USWDSLink
            className="usa-button bg-accent-cool margin-1"
            variant="unstyled"
            asCustom={Link}
            to="/qa/tests"
            role="link"
            exact="true"
            rel="QA & Certifications"
            title="Go to QA & Certifications page"
            key="qa-test"
            id="qaCertificationsBtn"
            onClick={(event) => handleRouteChange(event, "/qa/tests")}
          >
            View QA & Certifications
          </USWDSLink>
        ) : (
          ""
        )}
        <ReactMarkdown
          className="padding-top-2 emissions-content"
          children={emissionsContent}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="forceUnderlineText colorContrast"
              />
            ),
          }}
        />
        {homeButtonsPermission() ? (
          <USWDSLink
            className="usa-button bg-accent-cool margin-1"
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
            View Emissions
          </USWDSLink>
        ) : (
          ""
        )}
      </div>
      <div className="grid-col-3 float-right padding-2">
        <div className="box border-1px">
          <h3 className="title text-white text-center padding-y-2 margin-y-0">
            What's New
          </h3>
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
                    className="forceUnderlineText colorContrast"
                  />
                ),
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutHome;
