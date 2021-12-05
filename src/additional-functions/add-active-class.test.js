import { addActiveClass,handleActiveElementFocus } from "./add-active-class";

describe("testing checkout function", () => {

  test("called addActiveClass", () => {
  const mockedFormEvent = { target: { querySelectorAll: jest.fn() }, preventDefault: jest.fn() };
  expect(addActiveClass(mockedFormEvent)).toEqual(1)
  expect(handleActiveElementFocus(mockedFormEvent)).toEqual(1)

  });
});
