import React from "react";
import AboutHome from "./AboutHome";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

jest.mock("../../utils/api/contentApi", () => {
  const testContent = {
    headers: { "content-type": "text/markdown" },
    data: "[Test Link] [Test Link]: <https://dev.epacdx.net/FAQ>",
  };
  return {
    getContent: jest.fn().mockResolvedValue(testContent),
  };
});

describe("testing home page ", () => {
  let container;

  beforeEach(() => {
    const renderResult = render(
      <BrowserRouter>
        <AboutHome user={{ firstName: "test" }} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );
    container = renderResult.container;
  });

  it("should not show a log in box ", async () => {
    const monPlansBtn = await screen.findByRole('link', { name: 'Go to Monitoring Plans page' });
    fireEvent.click(monPlansBtn);

    const emissionsBtn = await screen.findByRole('link', { name: 'Go to Emissions page' });
    fireEvent.click(emissionsBtn);

    const qaCertsBtn = await screen.findByRole('link', { name: 'Go to QA & Certifications page' });
    fireEvent.click(qaCertsBtn);
  });

  it("should show a log in box ", async () => {
    const loginBox = await screen.findByTestId("homeLogIn");
    expect(loginBox).toBeDefined();
  });
});
