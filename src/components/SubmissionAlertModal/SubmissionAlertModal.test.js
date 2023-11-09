import { render, screen } from "@testing-library/react";
import SubmissionSuccessModal from "./SubmissionAlertModal";

window.scrollTo = jest.fn();

describe("Submission Success Modal", () => {
  it("Should render the SubmissionSuccessModal without crashing and call the callback on button close", async () => {
    const mockFunction = jest.fn();
    render(<SubmissionSuccessModal callback={mockFunction} />);

    screen.getByTestId("submissionSuccessButton").click();
    expect(mockFunction).toHaveBeenCalled();
  });
});
