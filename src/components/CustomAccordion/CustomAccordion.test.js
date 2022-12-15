import React from "react";
import { render, screen } from "@testing-library/react";
import CustomAccordion from "./CustomAccordion";
import userEvent from "@testing-library/user-event";

describe("testing a reusable accordion component", () => {
  const accordion = (
    <CustomAccordion
      title={"test Title"}
      table={[
        ["test", "component"],
        ["test2", "component2"],
      ]}
    />
  );
  it("renders an accordion dropdown button and clicks it twice ", () => {
    const { container } = render(accordion);

    let accordions = screen.getAllByRole("button");
    expect(accordions).toHaveLength(2);

    userEvent.click(accordions[0]);
    expect(container.querySelector('#collapseBTN')).toBeInTheDocument();
    userEvent.click(accordions[0]);
    expect(container.querySelector('#expandBTN')).toBeInTheDocument();
  });

  describe("tests the rigth side button next to title", ()=>{
  
    it("does not render right side component when headerButtonText prop falsy", ()=>{
      render(accordion);
      expect(screen.queryByTestId("rightside-accordion-button-0")).not.toBeInTheDocument();
    })
    
    it("renders right side component when headerButtonText prop truthy", ()=>{
      const headerButtonClickHandler = jest.fn()
      const clonedAccordion = React.cloneElement(accordion, {headerButtonText: "Download To CSV", headerButtonClickHandler})
      render(clonedAccordion);
      const downloadBtn = screen.queryByTestId("rightside-accordion-button-0");

      expect(downloadBtn).toBeInTheDocument();
      userEvent.click(downloadBtn);
      expect(headerButtonClickHandler).toHaveBeenCalled();
    })
  })
});
