import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import QACertTestSummaryHeaderInfo from "./QACertTestSummaryHeaderInfo";

jest.mock("axios");

const date = new Date();
const dateString = date.toString();

const selectedConfig = {
  id: "testConfigId",
  userId: "testUserId",
  updateDate: dateString,
  addDate: dateString,
  active: true,
};

const props = {
  facility: "Test (1, 2, 3)",
  selectedConfig: selectedConfig,
  orisCode: "testOrisCode",
  sectionSelect: [4, "Methods"],
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  locationSelect: [0, "testLocName"],
  locations: [
    { id: "testLocId", name: "testLocName", type: "testType", active: true },
  ],
  user: { firstName: "test" },

  configID: "testConfigId",
};

// mocking JavaScript built-in window functions
window.open = jest.fn().mockReturnValue({ close: jest.fn() });
window.scrollTo = jest.fn();

const oneMin = 60000;
jest.setTimeout(oneMin);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("testing QACertTestSummaryHeaderInfo component", () => {
  const { container } = render(<QACertTestSummaryHeaderInfo {...props} />);

  expect(container).toBeDefined();
});

test("testing QACertTestSummaryHeaderInfo component and opening selection modal import", () => {
  const { container } = render(<QACertTestSummaryHeaderInfo {...props} />);
  const openBtn = container.querySelector("#importSelectionQAModal");

  fireEvent.click(openBtn);
  expect(container).toBeDefined();
});
