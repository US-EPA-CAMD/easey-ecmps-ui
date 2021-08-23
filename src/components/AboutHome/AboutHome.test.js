import React from "react";
import AboutHome from "./AboutHome";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("testing home page ", () => {
  it("should not show a log in box ", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutHome user={{ firstName: "test" }} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );

    const btns = screen.getAllByText("View Emissions");
    expect(btns).toBeDefined();
    for (var x of btns) {
      fireEvent.click(x);
    }
  });

  it("should show a log in box ", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutHome setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );

    const loginBox = screen.getByTestId("homeLogIn");
    expect(loginBox).toBeDefined();
  });
});
