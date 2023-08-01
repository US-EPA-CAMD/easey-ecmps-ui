import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { SelectableAccordion } from "./SelectableAccordion";
import render from "../../mocks/render";

describe("Selectable Accordion", () => {
  it("Render selectable accordion with no items", async () => {
    await render(
      <SelectableAccordion
        items={[]}
        setCanCheck={jest.fn()}
        submissionActionLog={{}}
        setSubmissionActionLog={jest.fn()}
      />
    );
    expect(screen.getByTestId("selectable-accordion-wrapper")).toBeInTheDocument();
  });

  it("Render selectable accordion items with no table records", async () => {
    await render(
      <SelectableAccordion
        items={[
          {
            title: "Statement1",
            content: "Content1",
            expanded: false,
            hasExpanded: false,
          },
          {
            title: "Statement2",
            content: "Content2",
            expanded: false,
            hasExpanded: false,
          },
        ]}
        submissionActionLog={{}}
        setSubmissionActionLog={jest.fn()}
        setCanCheck={jest.fn()}
      />
    );
    expect(screen.getByRole('button', {name: "Statement1", expanded:false})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: "Statement2", expanded:false})).toBeInTheDocument();
    expect(screen.getAllByText("There are no records to display").length).toBe(2);
  });

  it("render component with data table records and expanded accordion interactions", async () => {
    const mockFuncs = jest.fn().mockImplementation();
    await render(
      <SelectableAccordion
        items={[
          {
            title: "Statement1",
            content: "Content1",
            expanded: true,
            hasExpanded: true,
            facData: [
              { oris: 3, facName: "Barry", unitInfo: "CS00AN" },
              { oris: 3, facName: "Barry", unitInfo: "CS00AN" },
              { oris: 3, facName: "Barry", unitInfo: "CS00AN" },
            ],
          },
          {
            title: "Statement2",
            content: "Content2",
            expanded: true,
            hasExpanded: true,
            facData: [
              { oris: 3, facName: "Barry", unitInfo: "CS00AN" },
              { oris: 3, facName: "Barry", unitInfo: "CS00AN" },
              { oris: 3, facName: "Barry", unitInfo: "CS00AN" },
            ],
          },
        ]}
        submissionActionLog={{}}
        setSubmissionActionLog={mockFuncs}
        setCanCheck={mockFuncs}
      />
    );
    const expandedBtn1 = screen.getByRole('button', {name: "Statement1", expanded:true});
    const expandedBtn2 = screen.getByRole('button', {name: "Statement2", expanded:true});
    expect(expandedBtn1).toBeInTheDocument();
    expect(expandedBtn2).toBeInTheDocument();
    expect(screen.getAllByRole("table").length).toBe(2);
    await fireEvent.click(expandedBtn1);
    await fireEvent.click(expandedBtn2);
    expect(mockFuncs).toHaveBeenCalledTimes(4);
    //screen.debug(null, Infinity);
  });
});
