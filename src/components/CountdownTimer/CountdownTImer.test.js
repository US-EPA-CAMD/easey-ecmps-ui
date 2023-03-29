import React from "react";
import { CountdownTimer, CountdownTimerRender } from "./CountdownTimer";
import { ReactWrapper, shallow } from "enzyme";

describe("CountdownTimer test suit", () => {
  let wrapper;

  test("shallow renders CountdownTimer component to display inactivity message", () => {

    wrapper = shallow(
      <CountdownTimer duration={0} countdownExpired={jest.fn()} />
    );
    let time = wrapper.find(".time-wrapper");

    expect(time).toBeDefined();
    expect(wrapper.text().includes('It appears that you are no longer actively working within the application.')).toBe(true);

  });
});
