import React from "react";
import { Link } from "react-router-dom";

import {
  Link as USWDSLink,
  Button,
  TextInput,
  Label,
  Radio,
  CharacterCount,
  Alert,
} from "@trussworks/react-uswds";

import { DetailsSelectBox as SelectBox } from "../DetailsSelectBox/DetailsSelectBox";
import { OpenInNew } from "@material-ui/icons";

import "./HelpSupport.scss";

const commentTypes = [
  {
    id: 1,
    comment: `Help using application`,
  },
  {
    id: 2,
    comment: `Report a bug`,
  },
  {
    id: 3,
    comment: `Data question`,
  },
  {
    id: 4,
    comment: `Suggested enhancement`,
  },
  {
    id: 5,
    comment: `Other`,
  },
];

const applicationOptions = [
  {
    value: "",
    text: "",
  },
  {
    value: "1",
    text: "Application 1",
  },
  {
    value: "2",
    text: "Application 2",
  },
];

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
      <div className="grid-row margin-top-5">
        <span className="text-bold font-heading-2xl">Contact Us</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
        <p className="text-italic margin-y-2">All fields are required</p>
      </div>
      <div>
        <Label htmlFor="txtEmail">Email</Label>
        <TextInput
          className="modalUserInput"
          id="txtEmail"
          epa-testid="txtEmail"
          epadataname="txtEmail"
          name="txtEmail"
          type="text"
        />
      </div>
      <div className="margin-top-2">
        <Label htmlFor="selApplication">Application</Label>
        <SelectBox
          className="modalUserInput"
          epadataname="selApplication"
          options={applicationOptions}
          selectKey="value"
          secondOption="text"
          id="selApplication"
          epa-testid="selApplication"
          name="selApplication"
        />
      </div>
      <div className="margin-top-2">
        <Label htmlFor="radioCommentType">Comment Type</Label>

        {commentTypes.map((comment) => {
          return (
            <Radio
              id={`radioComment_${comment.id}`}
              name="radioCommentType"
              label={comment.comment}
              value={comment.id}
              key={`key_${comment.id}`}
            />
          );
        })}
      </div>
      <div className="margin-top-2">
        <Label htmlFor="txtComment" id="labelComment">
          Comment
        </Label>
        <CharacterCount
          isTextArea="true"
          id="txtComment"
          name="txtComment"
          title="Enter your comment"
          maxLength={500}
          rows={3}
        />
      </div>
      <div className="margin-top-2">
        <Button
          className="padding-3"
          type="button"
          id="btnSubmit"
          name="btnSubmit"
          onClick={void 0}
          data-testid="input-button-search"
        >
          Submit
        </Button>
      </div>
      <div className="margin-top-2">
        <Alert type="success" heading="Success">
          Thank you, your form has been submitted and an email confirmation will
          be sent to you shortly.
        </Alert>
      </div>
    </div>
  );
};

export default HelpSupport;
