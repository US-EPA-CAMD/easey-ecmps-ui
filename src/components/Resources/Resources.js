import React from "react";
import { Link as USWDSLink, Button } from "@trussworks/react-uswds";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { Link } from "react-router-dom";
import "./Resources.scss";

const Resources = () => {
  const topics = [
    {
      name: "Glossary",
      descriptions:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
      url: "/monitoring-plans",
    },
    {
      name: "Reporting Instructions",
      descriptions:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
      url: "/qa_certifications",
    },
    {
      name: "CAM API",
      descriptions:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet.",
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

  return (
    <div className="grid-row padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-col-auto fit-content">
        <div>
          <span className="text-bold font-heading-2xl">Resources</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            fringilla massa in lectus volutpat scelerisque. Cras eu leo vel
            lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium
            laoreet.
          </p>
        </div>
        <div className="grid-row">
          {topics.map((topic) => {
            return (
              <div
                className=" padding-top-2 padding-bottom-2 grid-col-4 padding-right-1"
                key={`container-${topic.name.replace(/ /g, "-")}`}
              >
                {" "}
                <h2 className="text-bold font-heading-xl">{topic.name} </h2>
                <div>{topic.descriptions}</div>
                <USWDSLink
                  className="usa-button usa-button--outline margin-top-1 margin-left-05"
                  outline="true"
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
                  Visit{" "}
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
            <li key={`li_${ele.name.replace(/ /g, "")}`}>
              <Button
                type="button"
                unstyled={true}
                className="text-primary text-underline"
                href={ele.url}
                role="link"
                rel={ele.name}
                title={`Go to ${ele.name} page`}
                key={ele.url}
                id={`${ele.name.split(" ").join("")}`}
              >
                {ele.name} <OpenInNewIcon />
              </Button>
            </li>
          );
        })}
        {/* </ul> */}
      </div>
    </div>
  );
};

export default Resources;
