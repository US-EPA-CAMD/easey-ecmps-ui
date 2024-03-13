import React from "react";
import { render, screen, wait, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HelpSupport from "./HelpSupport";
import userEvent from "@testing-library/user-event";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => { });

jest.mock("../../utils/api/contentApi", () => {
  const testContent = {
    headers: { "content-type": "text/markdown" },
    data: "test",
  };
  return {
    getContent: jest.fn().mockResolvedValue(testContent),
  };
});

jest.mock("../../utils/api/camdServices", () => {
  return {
    sendSupportEmail: jest
      .fn()
      .mockRejectedValueOnce(
        new Error(
          "Server error occurred while attempting to submit the contact form."
        )
      )
      .mockResolvedValue({}),
  };
});

describe("renders and tests HelpSupport component", () => {
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

  let helpSupport;

  beforeEach(async () => {
    helpSupport = render(
      <BrowserRouter>
        <HelpSupport />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    helpSupport = null;
  });

  test("submit blank contact form and get validation error", async () => {
    const blankFieldsMsg =
      "Please complete the fields below to send an email to ECMPS Beta Support. You may also send an email directly to";
    const submitBtn = helpSupport.container.querySelector(
      "[data-testid='input-button-search']"
    );

    await waitFor(() => {
      userEvent.click(submitBtn);
    });
    expect(screen.findByText(blankFieldsMsg)).toBeTruthy();
  });

  test("comment options are populated properly", () => {
    commentTypes.forEach((element) => {
      if (element.comment !== "") {
        expect(helpSupport.getByText(element.comment)).toBeTruthy();
      }
    });
  });

  test("submit completed contact form (twice) and get server error & success message", async () => {
    const submitBtn = helpSupport.container.querySelector(
      "[data-testid='input-button-search']"
    );

    // email
    const emailInput = screen.getByTestId("textInput");
    expect(emailInput).not.toBeDisabled();
    userEvent.type(emailInput, "myemail@email.com");
    expect(screen.findByDisplayValue("myemail@email.com")).toBeTruthy();
    // expect(screen.findByDisplayValue("myemail@email.com"));

    // comment type
    const commentTypeInput = screen.getByLabelText("Help using application");
    expect(commentTypeInput).not.toBeDisabled();
    userEvent.click(commentTypeInput);

    // comment
    const commentInput = screen.getByTestId("textarea");
    expect(commentInput).not.toBeDisabled();
    userEvent.type(commentInput, "mycomment");

    const errorMsg =
      "An error occurred while submitting your comment. Please try again later!";
    const successMsg =
      "Thank you, your form has been submitted and an email confirmation will be sent to you shortly.";
    const submitButton = screen.getByTestId('input-button-search');
    // submit form (receive server error)
    userEvent.click(submitButton);
    expect(screen.findByText(errorMsg)).toBeTruthy();
    userEvent.click(submitButton);
    expect(screen.findByText(successMsg)).toBeTruthy();
  });

  test("show error if email format is incorrect", async () => {
    const emailInput = screen.getByLabelText("* Email");
    userEvent.type(emailInput, "myInvalidEmail.com");
    const commentTypeInput = screen.getByLabelText("Help using application");
    userEvent.click(commentTypeInput);
    const commentInput = screen.getByTestId("textarea");
    userEvent.type(commentInput, "mycomment");
    const submitBtn = helpSupport.container.querySelector(
      "[data-testid='input-button-search']"
    );
    userEvent.click(submitBtn);
    const invalidEmailErrorMsg =
      "* Email";
    expect(screen.getByText(invalidEmailErrorMsg)).toBeInTheDocument();
  });

  test("does not show error if email format is correct", async () => {
    const emailInput = screen.getByLabelText("* Email");
    userEvent.type(emailInput, "my.email@test.com");
    const commentTypeInput = screen.getByLabelText("Help using application");
    userEvent.click(commentTypeInput);
    const commentInput = screen.getByTestId("textarea");
    userEvent.type(commentInput, "mycomment");
    const submitBtn = helpSupport.container.querySelector(
      "[data-testid='input-button-search']"
    );
    const invalidEmailErrorMsg =
      "The email you provided is not a valid address. Please enter a valid email address.";
    expect(screen.queryByText(invalidEmailErrorMsg)).not.toBeInTheDocument();
  });

});
