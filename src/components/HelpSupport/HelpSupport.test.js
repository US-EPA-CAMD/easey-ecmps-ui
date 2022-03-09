import React from "react";
import { render, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HelpSupport from "./HelpSupport";
import userEvent from "@testing-library/user-event";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

jest.mock("../../utils/api/contentApi", () => {
  const testContent = {
    headers: { "content-type": "text/markdown" },
    data: "test",
  };
  return {
    getContent: jest.fn().mockResolvedValue(testContent),
  };
});

jest.mock("../../utils/api/quartzApi", () => {
  return {
    sendNotificationEmail: jest
      .fn()
      .mockRejectedValueOnce(
        new Error(
          "Server error occurred while attempting to submit the contact form."
        )
      )
      .mockResolvedValueOnce({}),
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

  test("submit blank contact form and get validation error", () => {
    const blankFieldsMsg =
      "All fields are required. Please fill in the form completely and submit again.";
    const submitBtn = helpSupport.container.querySelector(
      "[data-testid='input-button-search']"
    );

    userEvent.click(submitBtn);
    expect(screen.getByText(blankFieldsMsg)).toBeInTheDocument();
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
    const emailInput = screen.getByLabelText("* Email");
    expect(emailInput).not.toBeDisabled();
    userEvent.type(emailInput, "myemail@email.com");
    expect(screen.getByDisplayValue("myemail@email.com")).toBeInTheDocument();

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

    // submit form (receive server error)
    await wait(() => {
      userEvent.click(submitBtn);
    });
    expect(screen.getByText(errorMsg)).toBeInTheDocument();

    // submit form (successful)
    await wait(() => {
      userEvent.click(submitBtn);
    });
    expect(screen.getByText(successMsg)).toBeInTheDocument();
  });
});
