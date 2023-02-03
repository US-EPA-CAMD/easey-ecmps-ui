import React from "react";
import Resources from "./Resources";
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

  const testResourceLinks = {
    data: [
      {
        name: "CDX",
        url: "https://cdx.epa.gov/",
        type: "external",
      },
      {
        name: "Tutorials",
        url: "/tutorials",
        type: "internal",
      },
    ],
  };

  return {
    getContent: jest
      .fn()
      .mockResolvedValueOnce(testContent)
      .mockResolvedValueOnce(testContent)
      .mockResolvedValueOnce(testContent)
      .mockResolvedValueOnce(testContent)
      .mockResolvedValueOnce(testContent)
      .mockResolvedValueOnce(testResourceLinks),
  };
});

describe("Resources: ", () => {
  it("render Resources component and check buttons", async () => {
    let resources;
    await wait(() => {
      resources = render(
        <BrowserRouter>
          <Resources />
        </BrowserRouter>
      );
    });

    await wait(() => {
      const topics = [
        "Visit The Glossary",
        "Visit Reporting Instructions",
        "Visit CAM API",
      ];

      topics.forEach((topic) => {
        const button = resources.getByText(topic);
        expect(button).toBeTruthy();
      });
    });
  });
});
