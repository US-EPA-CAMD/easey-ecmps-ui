import React from "react";

import {
  Button,
  TextInput,
  Label,
  Radio,
  CharacterCount,
  Alert,
  Fieldset,
} from "@trussworks/react-uswds";

import "./ContactUs.scss";

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

export const ContactUs = () => {
  return (
    <>
      <div className="grid-row margin-top-5">
        <h3 className="text-bold font-heading-2xl">Contact Us</h3>
        <div className="flex-force-break" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          massa in lectus volutpat scelerisque. Cras eu leo vel lacus tincidunt
          molestie. Vestibulum faucibus enim sit amet pretium laoreet.
        </p>
        <div className="flex-force-break" />
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
        <Fieldset
          id={`radioCommentType`}
          epadataname={"radioCommentType"}
          epa-testid={"radioCommentType"}
          name={"radioCommentType"}
          legend="Comment Type"
        >
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
        </Fieldset>
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
          className="padding-x-3 padding-y-2"
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
    </>
  );
};

export default ContactUs;
