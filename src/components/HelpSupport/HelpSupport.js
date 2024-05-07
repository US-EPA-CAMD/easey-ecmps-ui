import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import { ContactForm } from "@us-epa-camd/easey-design-system";
import * as yup from 'yup';
import axios from "axios";
import "./HelpSupport.scss";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendSupportEmail } from "../../utils/api/camdServices";
import config from "../../config";
import { handleResponse, handleError } from "../../utils/api/apiUtils";

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

export const HelpSupport = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const [mainContent, setMainContent] = useState();
  const [faqsContent, setFaqsContent] = useState();
  const [tutorialsContent, setTutorialsContent] = useState();

  useEffect(() => {
    document.title = "ECMPS Help & Support";

    getContent("/ecmps/help-support/index.md").then((resp) =>
      setMainContent(resp.data)
    );
    getContent("/ecmps/help-support/faqs.md").then((resp) =>
      setFaqsContent(resp.data)
    );
    getContent("/ecmps/help-support/tutorials.md").then((resp) =>
      setTutorialsContent(resp.data)
    );
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
  const schema = yup.object().shape({
    email: yup.string().email(),
  });
  const onSubmitHandler = () => {
    // form data selectors
    let subject = "";
    const message = document.querySelector("#txtComment").value;
    const fromEmail = document.querySelector("#txtEmail").value;
    const checkedSubjectId = document.querySelector(
      "fieldset div input[name='radioSubject']:checked"
    );
    const isEmailValid = schema.isValidSync({email: fromEmail});

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
    }else if (!isEmailValid){
      setSubmitStatus(false);
      setSubmitted(true);
      setEmailErrorMsg(
        "The email you provided is not a valid address. Please enter a valid email address."
      );
    }

    // Attempt API call (send email notification)
    else {
      const payload = {
        fromEmail: fromEmail,
        subject: subject,
        message: message,
      };

      sendSupportEmail(payload)
        // Successful submission
        .then((res) => {
          setSubmitStatus(true);
          setSubmitted(true);
        })

        // Error returned
        .catch((error) => {
          setSubmitStatus(false);
          setSubmitted(true);
          setEmailErrorMsg(
            "An error occurred while submitting your comment. Please try again later!"
          );
        });
    }
  };

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in help-support-container">
      <div className="grid-row">
        <ReactMarkdown
          id="main-content"
          className="main-content"
          children={mainContent}
          remarkPlugins={[remarkGfm]}
        />
      </div>
      <div className="grid-row margin-top-5">
        <ReactMarkdown
          className="faqs-content"
          children={faqsContent}
          remarkPlugins={[remarkGfm]}
        />
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
        <ReactMarkdown
          className="tutorials-content"
          children={tutorialsContent}
          remarkPlugins={[remarkGfm]}
        />
      </div>
      <ContactForm
        summary={parse(
          `Please complete the fields below to send an email to ECMPS Beta Support. 
            You may also send an email directly to <a href='mailto:ecmps-beta@camdsupport.com'>ecmps-beta@camdsupport.com</a>.`
        )}
        subjects={commentTypes}
        onSubmit={onSubmitHandler}
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
