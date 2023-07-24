import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';
import * as contentApi from "../../utils/api/contentApi";

const mockFn = jest.fn();

jest.mock("../../additional-functions/app-error", () => ({
  hideAppError: () => mockFn,
}));

const testContent = {
  heading: "Test Heading:",
  message: "Test message.",
  enabled: "true",
};
describe('Layout', () => {
  beforeEach(() => {
    jest.spyOn(contentApi, "getContent").mockResolvedValue({ data: testContent })
  });
  it('renders Layout component', () => {
    let renderer

    act(() => {
      renderer = render(<Layout />, { wrapper: MemoryRouter });
    })
    const layout = renderer.container.querySelector('#layout');
    expect(layout).toBeInTheDocument();
  });

  it('Clears error messages on Enter key press', () => {
    let renderer

    act(() => {
      renderer = render(<Layout />, { wrapper: MemoryRouter });
    })

    const errorMsgBanner = renderer.container.querySelector("#appErrorMessage");
    // fire keyPress event (Enter) on error message close button
    const child = errorMsgBanner.children[1];
    act(() => {
      fireEvent.keyPress(child, {
        key: "Enter",
        code: 13,
        charCode: 13,
      });
    })
  });

  it('Clears error messages on Click', () => {
    let renderer

    act(() => {
      renderer = render(<Layout />, { wrapper: MemoryRouter });
    })

    const errorMsgBanner = renderer.container.querySelector("#appErrorMessage");
    // fire keyPress event (Enter) on error message close button
    const child = errorMsgBanner.children[1];
    act(() => {
      fireEvent.click(child);
    })
  });

}
);
