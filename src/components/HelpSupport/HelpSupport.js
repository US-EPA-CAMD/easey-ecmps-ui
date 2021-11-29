import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as USWDSLink, Button } from "@trussworks/react-uswds";
import { OpenInNew } from "@material-ui/icons";
import { ContactForm } from "@us-epa-camd/easey-design-system";

import "./HelpSupport.scss";
import { sendNotificationEmail } from "../../utils/api/quartzApi";

export const HelpSupport = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    document.title = "ECMPS Help & Support";
  }, []);

  const commentTypes = [
    {
      id: 1,
      value: `Help using application`,
    },
    {
      id: 2,
      value: `Report a bug`,
    },
    {
      id: 3,
      value: `Data question`,
    },
    {
      id: 4,
      value: `Suggested enhancement`,
    },
    {
      id: 5,
      value: `Other`,
    },
  ];
  const onSubmitHandler = (e) => {
    console.log(e);

    sendNotificationEmail().then((res) => {
      // TODO: set this based on succesful call to api to send email
      console.log(res);
      const x = Math.random() * (10 - 1) + 1;
      setSubmitStatus(x <= 5 ? false : true);
      setSubmitted(true);
    });
  };

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-row">
        <h2 className="text-bold font-heading-2xl">Help/Support</h2>
        <div className="flex-force-break" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
      </div>
      <div className="grid-row margin-top-5">
        <h3 className="text-bold font-heading-2xl">FAQs</h3>
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
        <h3 className="text-bold font-heading-2xl">Tutorials</h3>
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
      <ContactForm
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Craseu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet."
        subjects={commentTypes}
        onSubmit={(e) => onSubmitHandler(e)}
        submitted={submitted}
        submitStatus={submitStatus}
        submitStatusText={
          submitStatus
            ? "Thank you, your form has been submitted and an email confirmation will be sent to you shortly."
            : "An error occurred while submitting your comment. Please try again later!"
        }
      />
    </div>
  );
};

export default HelpSupport;
