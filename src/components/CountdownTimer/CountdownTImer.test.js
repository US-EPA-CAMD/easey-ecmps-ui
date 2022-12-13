import React from "react";
import { CountdownTimer, CountdownTimerRender } from "./CountdownTimer";
import { ReactWrapper, shallow } from "enzyme";

describe("CountdownTimer test suit", () => {
  let wrapper;

  test("shallow renders CountdownTimer component to display inactivity message", () => {
    // const useRefSpy = jest
    //   .spyOn(React, "useRef")
    //   .mockReturnValueOnce({ current: 0 });
    wrapper = shallow(
      <CountdownTimer duration={0} countdownExpired={jest.fn()} />
    );
    let time = wrapper.find(".time-wrapper");

    expect(time).toBeDefined();
    expect(wrapper.text().includes('It looks like you have been inactive for a while.')).toBe(true);
  });

  test("shallow renders CountdownTimerRender to display Logging out due to inactivity message", () => {
    // const useRefSpy = jest
    //   .spyOn(React, "useRef")
    //   .mockReturnValueOnce({ current: 1000 });
    wrapper = shallow(
      <CountdownTimerRender remainingTime={0} countdownExpired={jest.fn()} />
    );
    let time = wrapper.find(".time-wrapper");
    expect(time).toBeDefined();
    expect(wrapper.text().includes('Logging out due to inactivity')).toBe(true);
  });
  
});
