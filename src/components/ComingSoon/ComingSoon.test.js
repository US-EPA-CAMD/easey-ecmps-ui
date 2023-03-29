import React from "react";
import { render } from "@testing-library/react";
import ComingSoon from "./ComingSoon";

describe("<ComingSoon/>", () => {
  window.scrollTo = jest.fn();

  test('should take user to a "coming soon" page', () => {
    const { container } = render(<ComingSoon />);
    expect(container).toBeDefined();
  });
});
