import { render, fireEvent } from '@testing-library/react';
import { addActiveClass, handleActiveElementFocus } from "./add-active-class";

const EPA_ACTIVE_ELEMENT = 'epa-active-element';

describe("Test addActiveClass function", () => {
  it("Should add epa-active-class to target element AND its parent", async () => {
    jest.useFakeTimers();
    const targetElement = document.createElement('div');
    const parentElement = document.createElement('div');
    parentElement.appendChild(targetElement);

    const event = { target: targetElement};
    addActiveClass(event);

    jest.runAllTimers();
    expect(event.target.classList.contains(EPA_ACTIVE_ELEMENT)).toBe(true);
    expect(event.target.parentElement.classList.contains(EPA_ACTIVE_ELEMENT)).toBe(true);

  })
});

describe('handleActiveElementFocus Test', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.useRealTimers();
  })

  it('Should add epa-active-element class on Click', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    handleActiveElementFocus();
    fireEvent.click(element);
    jest.runAllTimers();

    expect(element.classList.contains(EPA_ACTIVE_ELEMENT)).toBe(true);
  })

  it('Should add epa-active-element class on Keydown of Enter', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    handleActiveElementFocus();
    fireEvent.keyDown(element, {key: 'Enter', code: 'Enter', charCode: 13})
    jest.runAllTimers();

    expect(element.classList.contains(EPA_ACTIVE_ELEMENT)).toBe(true);
  })

  it('Should NOT add epa-active-element class on Keydown of non-Enter key', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    handleActiveElementFocus();
    fireEvent.keyDown(element, {key: 'A', code: 'KeyA'})
    jest.runAllTimers();

    expect(element.classList.contains(EPA_ACTIVE_ELEMENT)).toBe(false);
  })

  it('Should remove epa-active-element class on Blur event', () => {
    const element = document.createElement('div');
    element.classList.add(EPA_ACTIVE_ELEMENT);
    document.body.appendChild(element);

    handleActiveElementFocus();
    fireEvent.blur(element);
    jest.runAllTimers();

    expect(element.classList.contains(EPA_ACTIVE_ELEMENT)).toBe(false);
  })
})
