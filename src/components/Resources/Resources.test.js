import React from "react";
import Resources from "./Resources";
import { fireEvent, screen, wait } from "@testing-library/react";
import render from "../../mocks/render";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

describe("Resources component ", () => {
  it("render Resources component and link buttons", async () => {
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
  
    jest.mock("../../utils/api/contentApi", () => {
      return {
        getContent: jest
        .fn()
        .mockResolvedValueOnce(testContent)
        .mockResolvedValueOnce(testContent)
        .mockResolvedValueOnce(testContent)
        .mockResolvedValueOnce(testContent)
        .mockResolvedValueOnce(testContent)
        .mockResolvedValueOnce(testResourceLinks),
      }
    });
    await render(<Resources/>);
    const glossaryLink = screen.getByRole('link', { name: 'Visit The Glossary' })
    expect(glossaryLink).toHaveAttribute('href', '/glossary');
    const repInstLink = screen.getByRole('link', { name: 'Visit Reporting Instructions' })
    expect(repInstLink).toHaveAttribute('href', '/reporting-instructions');
    const camApiLink = screen.getByRole('link', { name: 'Visit CAM API' })
    expect(camApiLink).toHaveAttribute('href', '/cam-api');
    //screen.debug(null, Infinity);
  });
});
