import React from "react";
import Menu from "./Menu";
import "@testing-library/jest-dom/extend-expect";

const environmentalTopics = [
  { title: "Environmental Topics" },
  {
    link: "https://www.epa.gov/environmental-topics/air-topics",
    name: "Air",
  },
];

describe("testing the creation of a submenu", () => {
  test("one submenu is created ", () => {
    const myInitialState = [false];
    React.useState = jest.fn().mockReturnValue([myInitialState, {}]);
    expect(Menu([environmentalTopics]).length).toEqual(1);
  });
});
