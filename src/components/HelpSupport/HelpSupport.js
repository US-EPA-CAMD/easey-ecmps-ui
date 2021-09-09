import React from "react";
import { Link } from "react-router-dom";

import { Link as USWDSLink, Button } from "@trussworks/react-uswds";

import { OpenInNew } from "@material-ui/icons";

import { ContactUs } from "../ContactUs/ContactUs";

import "./HelpSupport.scss";

export const HelpSupport = () => {
  return (
    <div className="padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-row">
        <span className="text-bold font-heading-2xl">Help/Support</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
      </div>
      <div className="grid-row margin-top-5">
        <span className="text-bold font-heading-2xl">FAQs</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
        <USWDSLink
          className="usa-button usa-button--outline margin-0 margin-left-05"
          outline="true"
          type="button"
          variant="unstyled"
          asCustom={Link}
          to={""}
          role="link"
          exact="true"
          rel="faq"
          title="Go to FAQ page"
          key="linkFAQ"
          data-testid="linkFAQ"
          // onClick={(event) => handleRouteChange(event, topic.url)}
        >
          Visit FAQs
        </USWDSLink>
      </div>
      <div className="grid-row margin-top-5">
        <span className="text-bold font-heading-2xl">Tutorials</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
        <ul className="margin-0 padding-0 margin-left-3">
          <li key="liCDXHelp">
            <Button
              type="button"
              unstyled={true}
              className="text-primary text-underline"
              role="link"
              title="Go to CDX Help Topics page"
              key="linkCDXHelp"
              data-testid="linkCDXHelp"
            >
              CDX Help Topics <OpenInNew />
            </Button>
          </li>
        </ul>
      </div>
      <ContactUs />
    </div>
  );
};

export default HelpSupport;
