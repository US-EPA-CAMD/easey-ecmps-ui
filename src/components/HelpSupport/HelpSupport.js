import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { Link as USWDSLink, Button } from "@trussworks/react-uswds";
import { OpenInNew } from "@material-ui/icons";
import { ContactForm } from "@us-epa-camd/easey-design-system";

import "./HelpSupport.scss";
import { sendNotificationEmail } from "../../utils/api/quartzApi";

export const HelpSupport = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

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
  const onSubmitHandler = () => {
    // form data selectors
    let subject = "";
    const message = document.querySelector("#txtComment").value;
    const fromEmail = document.querySelector("#txtEmail").value;
    const checkedSubjectId = document.querySelector(
      "fieldset div input[name='radioSubject']:checked"
    );

    // Get label of selected radio button (comment types / subject)
    if (checkedSubjectId) {
      subject = commentTypes.find(
        (type) => type.id === parseInt(checkedSubjectId.value)
      ).value;
    }

    // Handle blank fields
    if (fromEmail === "" || subject === "" || message === "") {
      setSubmitStatus(false);
      setSubmitted(true);
      setEmailErrorMsg(
        "All fields are required. Please fill in the form completely and submit again."
      );
    }

    // Attempt API call (send email notification)
    else {
      const payload = {
        fromEmail: fromEmail,
        subject: subject,
        message: message,
      };

      sendNotificationEmail(payload)
        // Successful submission
        .then((res) => {
          console.log(res);
          setSubmitStatus(true);
          setSubmitted(true);
        })

        // Error returned
        .catch((error) => {
          console.log(error);
          setSubmitStatus(false);
          setSubmitted(true);
          setEmailErrorMsg(
            "An error occurred while submitting your comment. Please try again later!"
          );
        });
    }
  };

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-row">
        <h2 className="text-bold font-heading-2xl">Help/Support</h2>
        <div className="flex-force-break" />
        <p>Coming Soon</p>
      </div>
      <div className="grid-row margin-top-5">
        <h3 className="text-bold font-heading-2xl">FAQs</h3>
        <div className="flex-force-break" />
        <p>Coming Soon</p>
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
        <p>Coming Soon</p>
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
        summary={parse(
          `Please complete the fields below to send an email to ECMPS Beta Support. 
            You may also send an email directly to <a href='mailto:ecmps-beta@camdsupport.com'>ecmps-beta@camdsupport.com</a>.`
        )}
        subjects={commentTypes}
        onSubmit={() => onSubmitHandler()}
        submitted={submitted}
        submitStatus={submitStatus}
        submitStatusText={
          submitStatus
            ? "Thank you, your form has been submitted and an email confirmation will be sent to you shortly."
            : emailErrorMsg
        }
      />
    </div>
  );
};

export default HelpSupport;
