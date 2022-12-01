/*
import React from "react";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmissionModal from "./SubmissionModal";

sessionStorage.setItem(
  "cdx_user",
  '{ "firstName": "mock", "lastName": "mock" }'
);

jest.mock("../../utils/api/easeyAuthApi", () => ({
  credentialsAuth: jest.fn().mockResolvedValue({
    data: { activityId: "", questionId: "", question: "Mock Question" },
  }),
  verifyChallenge: jest.fn().mockResolvedValue({
    data: true,
  }),
  getCredentials: jest.fn().mockResolvedValue({
    data: [
      {
        statementText: "Statement Text Mock b",
        facData: [],
      },
    ],
  }),
}));
window.scrollTo = jest.fn();

describe("Submission Modal", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Render Submission Modal with no errors", () => {
    const { container } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={jest.fn()}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    expect(container).toBeDefined();
  });

  test("Submit Auth With Errors", async () => {
    const { getByText } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={jest.fn()}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    await act(async () => {
      getByText("Verify").click();
    });

    expect(
      getByText("Please enter your username and password")
    ).toBeInTheDocument();
  });

  test("Submit Auth With No Errors", async () => {
    const { getByText } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={jest.fn()}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    await act(async () => {
      const usernameInput = screen.getByTestId("component-login-username");
      await userEvent.type(usernameInput, "myusername");

      const passwordInput = screen.getByTestId("component-login-password");
      await userEvent.type(passwordInput, "mypassword");

      await getByText("Verify").click();
    });

    expect(getByText("Mock Question")).toBeInTheDocument();
  });

  test("Submit Question With Errors", async () => {
    const { getByText } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={jest.fn()}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    const submissionButton = getByText("Verify");

    await act(async () => {
      const usernameInput = screen.getByTestId("component-login-username");
      await userEvent.type(usernameInput, "myusername");

      const passwordInput = screen.getByTestId("component-login-password");
      await userEvent.type(passwordInput, "mypassword");

      await submissionButton.click();
    });

    await act(async () => {
      await submissionButton.click();
    });

    expect(
      getByText("Please enter your answer to the challenge question")
    ).toBeInTheDocument();
  });

  test("Submit Question With No Errors", async () => {
    const { getByText } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={jest.fn()}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    const submissionButton = getByText("Verify");

    await act(async () => {
      const usernameInput = screen.getByTestId("component-login-username");
      await userEvent.type(usernameInput, "myusername");

      const passwordInput = screen.getByTestId("component-login-password");
      await userEvent.type(passwordInput, "mypassword");

      await submissionButton.click();
    });

    await act(async () => {
      const answerInput = screen.getByTestId("component-answer");
      await userEvent.type(answerInput, "myanswer");

      await submissionButton.click();
    });

    expect(getByText("Certification Statement(s)")).toBeInTheDocument();
  });

  test("Submit Final Modal After Cert Clicks", async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={callback}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    const submissionButton = getByText("Verify");

    await act(async () => {
      const usernameInput = screen.getByTestId("component-login-username");
      await userEvent.type(usernameInput, "myusername");

      const passwordInput = screen.getByTestId("component-login-password");
      await userEvent.type(passwordInput, "mypassword");

      await submissionButton.click();
    });

    await act(async () => {
      const answerInput = screen.getByTestId("component-answer");
      await userEvent.type(answerInput, "myanswer");

      await submissionButton.click();
    });

    await act(async () => {
      await getByText("Certification Statement").click();
    });

    await act(async () => {
      const checkBox = await screen.getByTestId("component-checkbox");
      await userEvent.click(checkBox);
      await submissionButton.click();
    });

    expect(callback).toHaveBeenCalled();
  });
});
*/
