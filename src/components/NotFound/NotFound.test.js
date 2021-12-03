import React from "react";
import NotFound from "./NotFound";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
describe("<NotFound/>", () => {
  test('should take user to a "not found" page', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });
});
