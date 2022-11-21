import React from "react";
import { render } from "@testing-library/react";

import ReviewAndSubmit from "./ReviewAndSubmit";

describe("Data preview component", () => {
  let query;
  beforeEach(() => {
    query = render(<ReviewAndSubmit />);
  });

  it("renders review and submit component properly", () => {
    const { getByRole, getByText } = query;
    expect(
      getByRole("checkbox", { name: "Monitoring Plan" })
    ).toBeInTheDocument();
    expect(
      getByRole("checkbox", { name: "QA & Certification" })
    ).toBeInTheDocument();
    expect(getByRole("checkbox", { name: "Emissions" })).toBeInTheDocument();
    expect(
      getByRole("radio", { name: "Exclude Files with Critical Errors" })
    ).toBeInTheDocument();
    expect(
      getByRole("radio", { name: "Include Files with Critical Errors" })
    ).toBeInTheDocument();
    expect(getByText("Facility ID(s)")).toBeInTheDocument();
    expect(getByText("Configuration(s)")).toBeInTheDocument();
    expect(getByText("Reporting Period(s)")).toBeInTheDocument();
  });
});
