import React from "react";
import { render, screen } from "@testing-library/react";
import { EmSubmissionData } from "./EmSubmissionData";
import "@testing-library/jest-dom/extend-expect";
import { mockedApiData } from "./mocks";

describe("<EmSubmissionData />", () => {

  test("renders table with data", async () => {

    render(<EmSubmissionData data={mockedApiData} selectedRows={[]} setSelectedRows={() => jest.fn()} />);
   
    const tableRecord = screen.getByText("2012-04-01");
    expect(tableRecord).toBeInTheDocument();
  });
});
