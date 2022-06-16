import React from "react";
import { render } from "@testing-library/react";
import QACertTestSummaryTabRender from "./QACertTestSummaryTabRender";

const selectedConfig = {
  id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
  name: "110",
  locations: [
    {
      id: "655",
      name: "110",
      type: "Unit",
      active: false,
      retireDate: null,
    },
  ],
};

const props = {
  title: " ( test ) ",
  user: { firstName: "test" },
  locations: selectedConfig.locations,
  selectedConfig: selectedConfig,
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  sectionSelect: [3, "Methods"],
  locationSelect: [0, "65"],
  orisCode: "5",

  configID: selectedConfig.id,
};
test("tests QACertTestSummaryTabRender", () => {
  const { container } = render(<QACertTestSummaryTabRender {...props} />);
  expect(container).not.toBeUndefined();
});
