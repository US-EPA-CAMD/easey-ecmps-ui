import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import "./HelpSupport.scss";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getContent } from "../../utils/api/contentApi";

export const HelpSupport = () => {

  const [mainContent, setMainContent] = useState();
  const [faqsContent, setFaqsContent] = useState();
  const [tutorialsContent, setTutorialsContent] = useState();
  const [contactUsContent, setContactUsContent] = useState();

  useEffect(() => {
    document.title = "ECMPS Help & Support";

    getContent("/ecmps/help-support/index.md").then((resp) =>
      setMainContent(resp.data)
    );
    getContent("/ecmps/help-support/faqs.md").then((resp) =>
      setFaqsContent(resp.data)
    );
    getContent("/ecmps/help-support/usersGuide.md").then((resp) =>
      setTutorialsContent(resp.data)
    );
    getContent("/ecmps/help-support/contactUs.md").then((resp) =>
      setContactUsContent(resp.data)
    );
  }, []);

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
          className="users-guide-content"
          children={tutorialsContent}
          remarkPlugins={[remarkGfm]}
        />
        <div className="flex-force-break" />
        <USWDSLink
          className="usa-button usa-button--outline margin-0 margin-left-05"
          outline="true"
          type="button"
          variant="unstyled"
          asCustom={Link}
          to="/users-guide"
          role="link"
          exact="true"
          rel="UsersGuide"
          title="Go to User's Guide page"
          key="linkUsersGuide"
          data-testid="linkUsersGuide"
        >
          Visit User's Guide
        </USWDSLink>
      </div>
      <div className="grid-row margin-top-5">
        <ReactMarkdown
          className="contactUs-content"
          children={contactUsContent}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </div>
  );
};

export default HelpSupport;
