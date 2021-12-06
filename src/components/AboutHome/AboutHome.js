import React, { useEffect } from "react";
import { Link as USWDSLink } from "@trussworks/react-uswds";

import { Link } from "react-router-dom";
import Login from "../Login/Login";

import "./AboutHome.scss";
const AboutHome = ({ user, setCurrentLink }) => {
  useEffect(() => {
    document.title = "ECMPS Home";
  }, []);
  const topics = [
    {
      name: "Monitoring Plans",
      descriptions:
        "The monitoring plan describes how a facility (monitoring configuration) monitors its emissions. Monitoring plan data define relationships between stacks, pipes, and units, specify locations at a facility from which emissions are monitored, and identify systems of monitoring equipment by detailing the individual system components. Monitoring plan data also provide operational characteristics and qualifications for certain special types of monitoring (e.g., low mass emissions monitoring). Draft beta monitoring plan instructions can be found here ",
      url: "/monitoring-plans",
      comingSoon: false,
    },
    {
      name: "QA & Certifications",
      descriptions:
        "QA and certification tests are required for all types of monitoring systems. Test extension or exemption data indicate variances from prescribed testing requirements or extensions to the normal QA testing schedule. QA or certification events (e.g., monitor replacements), as well as data elements for submitting an electronic certification application when certifications are required, are submitted when there is either diagnostic or recertification testing of specific monitoring systems or components. ",
      url: "/qa_certifications",
      comingSoon: true,
    },
    {
      name: "Emissions",
      descriptions:
        "Emissions data are hourly values for measured parameters, calculated hourly emissions values, instrument calibration data, and aggregated summary data. An emissions file contains one calendar quarter of hourly and aggregate emissions measurements for a specified unit or group of related units, including stacks and pipes. Each unit that is required to submit emissions data for a particular calendar quarter must be included in one and only one emissions file for that quarter. Each emissions file should contain all relevant operating, daily quality assurance, and emissions data for all units, common stacks, multiple stacks, or common pipes that were in a common monitoring configuration for any part of the quarter. ",
      url: "/emission",
      comingSoon: true,
    },
  ];

  const handleRouteChange = (event, url) => {
    setCurrentLink(url);
  };

  return (
    <div className="grid-row padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-col-9 fit-content">
        <div>
          <h2 className="text-bold font-heading-2xl">About ECMPS 2.0 Beta</h2>
          <p className="text-bold font-heading-md">
            The Emissions Collection and Monitoring Plan System 2.0 Beta is the
            new web-based reporting tool released in beta form to allow industry
            users and the public to begin testing and learning the new
            application. The initial application, released in December of 2021,
            begins with the limited functionality of view (no login required)
            and edit/evaluate (
            <a target="_blank" href="https://test.epacdx.net/FAQ">
              CDX Test login
            </a>{" "}
            required) of monitoring plan data. Subsequent releases throughout
            2022 will add import and export functionality and the additional
            data types—QA, certifications, and emissions. Data in the beta is
            not production data and is only being used for testing purposes.
          </p>
          <p>
            There are two primary goals of the extended beta process.
            <ol>
              <li>
                Allow users to learn the new web-based reporting tool and
                provide feedback to EPA.
              </li>
              <li>
                Allow EPA time to test and integrate the beta application into
                the future production environment and incorporate user feedback.
              </li>
            </ol>
          </p>
          <p>
            Please subscribe to{" "}
            <a target="_blank" href={"https://ecmps.blogspot.com/"}>
              https://ecmps.blogspot.com/
            </a>{" "}
            for additional updates. Have questions or feedback? Please contact
            us at through our Contact Us form (
            <a href={"https://easey-dev.app.cloud.gov/ecmps/help-support"}>
              https://easey-dev.app.cloud.gov/ecmps/help-support
            </a>
            )
          </p>
        </div>
        {topics.map((topic) => {
          return (
            <div className=" padding-top-2 padding-bottom-2">
              {" "}
              <h3 className="text-bold font-heading-xl">{topic.name} </h3>
              {topic.comingSoon ? (
                <p>
                  <strong>
                    This data is not included as part of the initial beta
                    release and will be added with updates in 2022
                  </strong>
                </p>
              ) : (
                ""
              )}
              <div>
                {topic.descriptions}
                {topic.name === "Monitoring Plans" ? (
                  <span>
                    (
                    <a
                      target="_blank"
                      href={
                        "https://app.zenhub.com/files/287570343/449899ef-7a75-4129-995c-ae4bf2e347bf/download"
                      }
                    >
                      https://app.zenhub.com/files/287570343/449899ef-7a75-4129-995c-ae4bf2e347bf/download
                    </a>
                    )
                  </span>
                ) : (
                  ""
                )}
              </div>
              <USWDSLink
                className="usa-button viewAboutBTN bg-accent-cool margin-1"
                variant="unstyled"
                asCustom={Link}
                to={topic.url}
                role="link"
                exact="true"
                rel={topic.name}
                title={`Go to ${topic.name} page`}
                key={topic.url}
                id={`${topic.name.split(" ").join("")}_btn`}
                onClick={(event) => handleRouteChange(event, topic.url)}
              >
                View {topic.name}
              </USWDSLink>
            </div>
          );
        })}{" "}
      </div>
      <div className="grid-col-3 float-right padding-2">
        <div className="padding-bottom-2">
          <div className="box box--rss">
            <div className="box__title">What's New</div>
            <div className="box__content">
              Welcome to the first release of the all new ECMPS 2.0 Beta! To
              view a list of functionality and how to get started go here
              (hyperlink to quick start guide, webinar release). Have questions
              or feedback? Please contact us through our Contact Us form (
              <a href="https://easey-dev.app.cloud.gov/ecmps/help-support">
                https://easey-dev.app.cloud.gov/ecmps/help-support
              </a>
              )
            </div>
          </div>
        </div>{" "}
        <div className="bg-base-lighter" data-testid="homeLogIn">
          {!user ? <Login isModal={false} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
