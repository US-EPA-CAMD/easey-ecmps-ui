import React from "react";
import AboutHome from "./AboutHome";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

describe("testing home page ", () => {
  it("should not show a log in box ", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutHome user={{ firstName: "test" }} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );

    const emissionsBtn = container.querySelector("#emissionsBtn");
    expect(emissionsBtn).toBeDefined();

    fireEvent.click(emissionsBtn);
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
