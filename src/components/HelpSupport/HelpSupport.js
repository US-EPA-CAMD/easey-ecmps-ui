import React,{useEffect} from "react";
import { Link } from "react-router-dom";

import { Link as USWDSLink, Button } from "@trussworks/react-uswds";

import { OpenInNew } from "@material-ui/icons";

import { ContactUs } from "../ContactUs/ContactUs";

import "./HelpSupport.scss";

export const HelpSupport = () => {
  useEffect(() => {
    document.title = "ECMPS Help & Support";
    }, [])
  return (
    <div className="padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-row">
        <div className="text-bold font-heading-2xl">Help/Support</div>
        <div className="flex-force-break" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
      </div>
      <div className="grid-row margin-top-5">
        <div className="text-bold font-heading-2xl">FAQs</div>
        <div className="flex-force-break" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
        <div className="flex-force-break" />
        <USWDSLink
          className="usa-button usa-button--outline margin-0 margin-left-05"
          outline="true"
          type="button"
          variant="unstyled"
          asCustom={Link}
          to="/faqs"
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
        <div className="text-bold font-heading-2xl">Tutorials</div>
        <div className="flex-force-break" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
        <div className="flex-force-break" />
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
