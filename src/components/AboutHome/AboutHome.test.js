import React from "react";
import AboutHome from "./AboutHome";
import { render, fireEvent, screen, wait } from "@testing-library/react";
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
  it("should not show a log in box ", async () => {
    await wait(() => {
      const { container } = render(
        <BrowserRouter>
          <AboutHome user={{ firstName: "test" }} setCurrentLink={jest.fn()} />
        </BrowserRouter>
      );

      const monPlansBtn = container.querySelector("#monitoringPlansBtn");
      expect(monPlansBtn).toBeDefined();
      fireEvent.click(monPlansBtn);

      const emissionsBtn = container.querySelector("#emissionsBtn");
      expect(emissionsBtn).toBeDefined();
      fireEvent.click(emissionsBtn);

      const qaCertsBtn = container.querySelector("#qaCertificationsBtn");
      expect(qaCertsBtn).toBeDefined();
      fireEvent.click(qaCertsBtn);
    });
  });

  it("should show a log in box ", async () => {
    await wait(() => {
      const { container } = render(
        <BrowserRouter>
          <AboutHome setCurrentLink={jest.fn()} />
        </BrowserRouter>
      );

      const loginBox = screen.getByTestId("homeLogIn");
      expect(loginBox).toBeDefined();
    });
  });
});
