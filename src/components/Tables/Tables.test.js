import React from "react";
import Tables from "./Tables";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("testing the sections area of monitoring plan that handles the accordions", () => {
  const TablesTest = ({ sectionSelect, matsTableFlag }) => {
    return (
      <Tables
        sectionSelect={sectionSelect}
        methodItems={[]}
        supItems={[]}
        matsTableFlag={matsTableFlag}
        systemsItems={[]}
      />
    );
  };

  test("testing monitoring methods selection", () => {
    const { container } = render(
      <TablesTest sectionSelect={"Monitoring Methods"} matsTableFlag={false} />
    );
    const accordion = container.querySelectorAll(".accordions");
    expect(accordion.length).toEqual(1);
  });
  test("testing monitoring methods selection with mats", () => {
    const { container } = render(
      <TablesTest sectionSelect={"Monitoring Methods"} matsTableFlag={true} />
    );
    const accordion = container.querySelectorAll(".accordions");
    expect(accordion.length).toEqual(2);
  });
  test("testing monitoring systems selection", () => {
    const { container } = render(
      <TablesTest sectionSelect={"Monitoring Systems"} matsTableFlag={true} />
    );
    const accordion = container.querySelectorAll(".accordions");
    expect(accordion.length).toEqual(1);
  });
});
