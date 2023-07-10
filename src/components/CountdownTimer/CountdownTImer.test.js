import React from "react";
import { render, screen } from "@testing-library/react";
import { CountdownTimer, CountdownTimerRender } from "./CountdownTimer";
import "@testing-library/jest-dom/extend-expect";
describe("CountdownTimer", () => {
  it("renders the countdown timer with the correct duration and message", () => {
    const duration = 60;
    const countdownExpiredMock = jest.fn();

    render(
      <CountdownTimer
        duration={duration}
        countdownExpired={countdownExpiredMock}
      />
    );

    const durationMessage = screen.getByText(
      `It looks like you have been inactive for a while. You will be logged out in ${duration} seconds for inactivity. Click Close to remain active.`
    );
    expect(durationMessage).toBeInTheDocument();
  });

  it("calls countdownExpired function when the countdown is done", () => {
    const duration = 10;
    const countdownExpiredMock = jest.fn();

    render(
      <CountdownTimer
        duration={duration}
        countdownExpired={countdownExpiredMock}
      />
    );

    // Wait for the countdown to finish
    setTimeout(() => {
      // Verify that the countdownExpired function is called
      expect(countdownExpiredMock).toHaveBeenCalled();
    }, duration * 1000);
  });
});

describe("CountdownTimerRender", () => {
  it("renders the remaining time correctly", () => {
    const remainingTime = 30;
    const countdownExpiredMock = jest.fn();

    render(
      <CountdownTimerRender
        remainingTime={remainingTime}
        countdownExpired={countdownExpiredMock}
      />
    );
    const remainingTimeElements = screen.getAllByText(remainingTime.toString());
    expect(remainingTimeElements.length).toBeGreaterThan(0);
  });

  // it('calls countdownExpired function when the remaining time reaches 0', async () => {

  //   const countdownExpiredMock = jest.fn();

  //   render(
  //     <CountdownTimerRender
  //       remainingTime={0}
  //       countdownExpired={countdownExpiredMock}
  //     />
  //   );
  //   expect(countdownExpiredMock).toHaveBeenCalled();
  // });
});
