import React from "react";
import { render, act, screen, prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmissionModal from "./SubmissionModal";
import * as easeyAuthApi from "../../utils/api/easeyAuthApi";

localStorage.setItem(
  "ecmps_user",
  '{ "firstName": "mock", "lastName": "mock" }'
);

// jest.mock("../../utils/api/easeyAuthApi", () => ({
//   credentialsAuth: jest.fn().mockResolvedValue({
//     data: {
//       activityId: "",
//       questionId: "",
//       question: "Mock Question",
//       mobileNumbers: [],
//     },
//   }),
//   verifyChallenge: jest.fn().mockResolvedValue({
//     data: true,
//   }),
//   getCredentials: jest.fn().mockResolvedValue({
//     data: [
//       {
//         statementText: "Statement Text Mock b",
//         facData: [],
//       },
//     ],
//   }),
//   sendPin: jest.fn(),
// }));
window.scrollTo = jest.fn();

describe("Submission Modal", () => {
  beforeEach(() => {
    jest.spyOn(easeyAuthApi, "credentialsAuth").mockResolvedValue({
      data: {
        activityId: "",
        questionId: "",
        question: "Mock Question",
        mobileNumbers: [],
      },
    })

    jest.spyOn(easeyAuthApi, "verifyChallenge").mockResolvedValue({
      data: true,
    })

    jest.spyOn(easeyAuthApi, "sendPin").mockResolvedValue({})

    jest.spyOn(easeyAuthApi, "getCredentials").mockResolvedValue({
      data: [
        {
          statementText: "Statement Text Mock b",
          facData: [],
        },
      ],
    })
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Render Submission Modal with no errors", () => {
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

  it("Submit Auth With Errors", async () => {
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
      getByText("Authenticate").click();
    });

    expect(
      getByText("Please enter your username and password")
    ).toBeInTheDocument();
  });

  it("Submit Auth With No Errors", async () => {
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

      await userEvent.click(getByText("Authenticate"));
    });

    expect(getByText("Mock Question")).toBeInTheDocument();
  });

  it("Submit Question With Errors", async () => {
    const { getByText } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={jest.fn()}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    const submissionButton = getByText("Authenticate");

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
      getByText("Please enter an answer to the challenge / pin verification")
    ).toBeInTheDocument();
  });

  it("Submit Question With No Errors", async () => {
    const { getByText } = render(
      <SubmissionModal
        show={true}
        close={jest.fn()}
        submissionCallback={jest.fn()}
        activityId=""
        setActivityId={jest.fn()}
      />
    );

    const submissionButton = getByText("Authenticate");

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
    });

    await act(async () => {
      const btn = getByText("Show answer")
      expect(btn).toBeInTheDocument();
      await userEvent.click(btn);
    });

    await act(async () => {
      await submissionButton.click();
    });
    
    expect(getByText("Hide answer")).toBeInTheDocument();
    expect(getByText("Certification Statement(s)")).toBeInTheDocument();
  });

  it("Submit Final Modal After Cert Clicks", async () => {
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

    let submissionButton = getByText("Authenticate");

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

    submissionButton = getByText("Certify");

    await act(async () => {
      const checkBox = await screen.getByTestId("component-checkbox");
      await userEvent.click(checkBox);
      await submissionButton.click();
    });

    expect(callback).toHaveBeenCalled();
  });
});
