import React from "react";
import { Link as USWDSLink } from "@trussworks/react-uswds";

import { Link } from "react-router-dom";
import Login from "../Login/Login";

import "./AboutHome.scss";
const AboutHome = ({ user, setCurrentLink }) => {
  const topics = [
    {
      name: "Monitoring Plans",
      descriptions:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      url: "/monitoring-plans",
    },
    {
      name: "QA & Certifications",
      descriptions:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      url: "/qa_certifications",
    },
    {
      name: "Emissions",
      descriptions:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      url: "/emission",
    },
  ];

  const handleRouteChange = (event, url) => {
    setCurrentLink(url);
  };

  return (
    <div className="grid-row padding-top-5 padding-2">
      <div className="grid-col-9 fit-content">
        <div>
          <h2 className="text-bold">About ECMPS</h2>
          <h4 className="text-bold">
            Examine she brother prudent add day ham. Far stairs now coming bed
            oppose hunted become his. You zealously departure had procuring
            suspicion. Books whose front would purse if be do decay. Quitting
            you way formerly disposed perceive ladyship are. Common turned boy
            direct and yet.
          </h4>
          <p>
            {" "}
            Examine she brother prudent add day ham. Far stairs now coming bed
            oppose hunted become his. You zealously departure had procuring
            suspicion. Books who{" "}
          </p>
        </div>
        {topics.map((topic) => {
          return (
            <div className=" padding-top-2 padding-bottom-2">
              {" "}
              <h3 className="text-bold">{topic.name} </h3>
              <div>{topic.descriptions}</div>
              <USWDSLink
                className="usa-button viewAboutBTN bg-cyan margin-1"
                variant="unstyled"
                asCustom={Link}
                to={topic.url}
                exact="true"
                rel={topic.name}
                title={`Go to ${topic.name} page`}
                key={topic.url}
                id={`${topic.name.split(" ").join("")}`}
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
              EPA and Unilever Announce Major Research Collaboration to Advance
              Non-animal Approaches for... EPA Celebrates 30 Years of Climate
              Partnerships EPA Takes Action to Address Risk from Chlorpyrifos
              and Protect Children’s Health
            </div>
          </div>
        </div>{" "}
        <div className="bg-base-lighter">{!user ? <Login /> : ""}</div>
      </div>
    </div>
  );
};

export default AboutHome;
