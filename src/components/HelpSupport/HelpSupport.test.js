import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HelpSupport from "./HelpSupport";

jest.mock("react-markdown", () => (props) => <>{props.children}</>);

jest.mock("remark-gfm", () => () => { });

const testContent = {
  headers: { "content-type": "text/markdown" },
  data: "test",
};

const mockGetContent = jest.fn().mockResolvedValue(testContent);

jest.mock("../../utils/api/contentApi", () => ({
  getContent: () => mockGetContent(),
}));

describe("HelpSupport", () => {
  it("expect get content api get called 4 times for 4 sections", async () => {
    render(
      <BrowserRouter>
        <HelpSupport />
      </BrowserRouter>
    );
    expect(mockGetContent).toHaveBeenCalledTimes(4);
  });
});