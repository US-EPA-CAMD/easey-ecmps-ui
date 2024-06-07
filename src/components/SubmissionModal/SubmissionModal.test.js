import React from "react";
import { render, act, screen, prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmissionModal from "./SubmissionModal";
import * as easeyAuthApi from "../../utils/api/easeyAuthApi";

localStorage.setItem(
  "ecmps_user",
  '{ "firstName": "mock", "lastName": "mock" }'
);

window.scrollTo = jest.fn();

describe("Submission Modal", () => {
  beforeEach(() => {

    jest.spyOn(easeyAuthApi, "createActivity").mockResolvedValue({
      data: [
        {
          statementText: "Statement Text Mock b",
          facData: [],
        },
      ],
    })

    jest.spyOn(easeyAuthApi, "getCredentials").mockResolvedValue({
      data: [
        [12,34],
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

    let submissionButton = await screen.getByTestId("saveBtn");

    await act(async () => {
      const checkBox = await screen.getByTestId("component-checkbox");
      await userEvent.click(checkBox);
      await submissionButton.click();
    });

    const checkResponse = expect(callback);
    expect(checkResponse).toBeTruthy();
    expect(easeyAuthApi.getCredentials).toHaveBeenCalled();
  });
});
