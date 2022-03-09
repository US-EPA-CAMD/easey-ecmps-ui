import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import ReportingInstructions from "./ReportingInstructions.js";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

jest.mock("../../utils/api/contentApi", () => {
  const testContent = {
    headers: { "content-type": "text/markdown" },
    data: "test",
  };
  return {
    getContent: jest.fn().mockResolvedValue(testContent),
  };
});

describe("<reporting instructions/>", () => {
  test("renders reporting instructions", () => {
    const { container, queryByPlaceholderText } = render(
      <ReportingInstructions />
    );

    expect(container).toBeDefined();
  });
});
