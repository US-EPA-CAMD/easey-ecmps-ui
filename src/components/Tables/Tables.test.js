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
      <TablesTest sectionSelect={3} matsTableFlag={false} />
    );
    const accordion = container.querySelectorAll("button");
    expect(accordion.length).toEqual(1);
  });
  test("testing monitoring methods selection with mats", () => {
    const { container } = render(
      <TablesTest sectionSelect={3} matsTableFlag={true} />
    );
    const accordion = container.querySelectorAll("button");
    expect(accordion.length).toEqual(2);
  });
  test("testing monitoring systems selection", () => {
    const { container } = render(
      <TablesTest sectionSelect={4} matsTableFlag={true} />
    );
    const accordion = container.querySelectorAll("button");
    expect(accordion.length).toEqual(1);
  });
});
