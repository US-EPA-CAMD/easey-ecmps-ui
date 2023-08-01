import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import ReportingInstructions from "./ReportingInstructions.js";
import * as contentApi from "../../utils/api/contentApi";

jest.mock("react-markdown", () => (props) => {
  return <>{props.children}</>;
});

jest.mock("remark-gfm", () => () => {});

describe("<reporting instructions/>", () => {
  beforeEach(() => {
    jest.spyOn(contentApi, "getContent").mockResolvedValue({
      headers: { "content-type": "text/markdown" },
      data: "test",
    })
  })
  
  test("renders reporting instructions", () => {
    const { container, queryByPlaceholderText } = render(
      <ReportingInstructions />
    );

    expect(container).toBeDefined();
  });
});
