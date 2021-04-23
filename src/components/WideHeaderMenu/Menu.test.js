import React from "react";
import Menu from "./Menu";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

const environmentalTopics = [
  {
    link: "https://www.epa.gov/environmental-topics",
    name: "Environmental Topics",
    key:"environmental"
  },
  {
    link: "https://www.epa.gov/environmental-topics/air-topics",
    name: "Air",
    key:"air"
  },
];
const myInitialState = [false];
React.useState = jest.fn().mockReturnValue([myInitialState, {}]);

describe("testing the creation of a submenu", () => {
  test("one submenu is created ", () => {
    expect(Menu([environmentalTopics]).length).toEqual(1);
  });

  test("clicking on a dropdown menu", () => {
    const { getByText } = render(Menu([environmentalTopics]));
    const searchBox = getByText("Environmental Topics");
    fireEvent.click(searchBox);
    let mpLink = getByText("Air");
    expect(mpLink).toBeInTheDocument();
  });
});

