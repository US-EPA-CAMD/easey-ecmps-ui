import React from "react";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Link } from "react-router-dom";
import './Resources.scss'
const Resources = ({ user, setCurrentLink }) => {
  const topics = [
    {
      name: "Glossary",
      descriptions:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      url: "/monitoring-plans",
    },
    {
      name: "Reporting Instructions",
      descriptions:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      url: "/qa_certifications",
    },
    {
      name: "CAM API",
      descriptions:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      url: "/emission",
    },
  ];

  const additionalResources = [
    {
      name: "CDX",
      url: "./",
    },
    {
      name: "Tutorials",
      url: "./",
    },
  ];

  // handled current left bar vertical blue bar in subHeader component
  // const handleRouteChange = (event, url) => {
  //   setCurrentLink(false);
  // };

  return (
    <div className="grid-row padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-col-auto fit-content">
        <div>
          <span className="text-bold font-heading-2xl">Resources</span>
          <p>
            {" "}
            Examine she brother prudent add day ham. Far stairs now coming bed
            oppose hunted become his. You zealously departure had procuring
            suspicion. Books who{" "}
          </p>
        </div>
        <div className="grid-row">
          {topics.map((topic) => {
            return (
              <div className=" padding-top-2 padding-bottom-2 grid-col-4 padding-right-1">
                {" "}
                <h2 className="text-bold font-heading-xl">{topic.name} </h2>
                <div>{topic.descriptions}</div>
                <USWDSLink
                  className="usa-button usa-button--outline"
                  outline
                  type="button"
                  variant="unstyled"
                  asCustom={Link}
                  to={topic.url}
                  role="link"
                  exact="true"
                  rel={topic.name}
                  title={`Go to ${topic.name} page`}
                  key={topic.url}
                  id={`${topic.name.split(" ").join("")}`}
                  // onClick={(event) => handleRouteChange(event, topic.url)}
                >
                  View{" "}
                  {topic.name === "Glossary"
                    ? `the ${topic.name}`
                    : `${topic.name}`}
                </USWDSLink>
              </div>
            );
          })}
        </div>
        <div>
          <span className="text-bold font-heading-2xl">
            Additional Resources
          </span>
          <p>
            {" "}
            Examine she brother prudent add day ham. Far stairs now coming bed
            oppose hunted become his. You zealously departure had procuring
            suspicion. Books who{" "}
          </p>
        </div>

        {/* <ul> */}
          {additionalResources.map((ele) => {
            return (
              <li>
                <u>
                  <Link
                    className="linkColor"
                    href={ele.url}
                    role="link"
                    rel={ele.name}
                    title={`Go to ${ele.name} page`}
                    key={ele.url}
                    id={`${ele.name.split(" ").join("")}`}
                  >
                    {ele.name} <OpenInNewIcon/>
                  </Link>
                </u>
              </li>
            );
          })}
        {/* </ul> */}
      </div>
    </div>
  );
};

export default Resources;
