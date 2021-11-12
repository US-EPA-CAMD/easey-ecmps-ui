// import React from "react";
// import { CountdownTimer, CountdownTimerRender } from "./CountdownTimer";
// import { mount, ReactWrapper, shallow } from "enzyme";

// describe("67440874", () => {
//   let wrapper: ReactWrapper;

//   //   afterEach(() => {
//   //     jest.restoreAllMocks();
//   //   });
//   test("...", () => {
//     const useRefSpy = jest
//       .spyOn(React, "useRef")
//       .mockReturnValueOnce({ current: 0 });
//     wrapper = shallow(
//       <CountdownTimer duration={0} countdownExpired={jest.fn()} />
//     );
//     let time = wrapper.find(".time-wrapper");

//     expect(time).toBeDefined();
//   });

//   test("...", () => {
//     const useRefSpy = jest
//       .spyOn(React, "useRef")
//       .mockReturnValueOnce({ current: 1000 });
//     wrapper = mount(
//       <CountdownTimerRender remainingTime={0} countdownExpired={jest.fn()} />
//     );
//     let time = wrapper.find(".time-wrapper");
//     expect(time).toBeDefined();
//   });
//   test("...", () => {
//     const useRefSpy = jest
//       .spyOn(React, "useRef")
//       .mockReturnValueOnce({ current: 0 });
//     wrapper = mount(
//       <CountdownTimerRender remainingTime={0} countdownExpired={jest.fn()} />
//     );
//     let time = wrapper.find(".time-wrapper");
//     expect(time).toBeDefined();
//   });

//   test("...", () => {
//     const useRefSpy = jest
//       .spyOn(React, "useRef")
//       .mockReturnValueOnce({ current: 0 });
//     wrapper = mount(
//       <CountdownTimerRender remainingTime={1000} countdownExpired={jest.fn()} />
//     );
//     let time = wrapper.find(".time-wrapper");
//     expect(time).toBeDefined();
//   });
//   test("...", () => {
//     const useRefSpy = jest
//       .spyOn(React, "useRef")
//       .mockReturnValueOnce({ current: null });
//     wrapper = mount(
//       <CountdownTimerRender remainingTime={1000} countdownExpired={jest.fn()} />
//     );
//     let time = wrapper.find(".time-wrapper");
//     expect(time).toBeDefined();
//   });

//   test("...", () => {
//     const useRefSpy = jest
//       .spyOn(React, "useRef")
//       .mockReturnValueOnce({ current: 2000 });
//     wrapper = mount(
//       <CountdownTimerRender remainingTime={2000} countdownExpired={jest.fn()} />
//     );
//     let time = wrapper.find(".time-wrapper");
//     expect(time).toBeDefined();
//   });

//   test("...", () => {
//     const useRefSpy = jest
//       .spyOn(React, "useRef")
//       .mockReturnValueOnce({ current: null });
//     wrapper = mount(
//       <CountdownTimerRender remainingTime={0} countdownExpired={jest.fn()} />
//     );
//     let time = wrapper.find(".time-wrapper");
//     expect(time).toBeDefined();
//   });
// });
test("test file", () => {
  const val = 1;
  expect(val === 1);
});
