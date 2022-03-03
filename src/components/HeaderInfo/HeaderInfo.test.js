import React from "react";
import {
  render,
  screen,
  within,
  fireEvent,
  wait,
} from "@testing-library/react";
import config from "../../config";

import userEvent from "@testing-library/user-event";

import HeaderInfo from "./HeaderInfo";

jest.mock("../../utils/api/quartzApi", () => {
  return {
    triggerEvaluation: jest.fn().mockResolvedValue({}),
  };
});
jest.mock("../../utils/api/monitoringPlansApi", () => {
  return {
    getRefreshInfo: jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "EVAL",
        },
      })
      .mockResolvedValueOnce({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "EVAL",
        },
      })
      .mockResolvedValueOnce({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "INQ",
        },
      })
      .mockResolvedValueOnce({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "WIP",
        },
      })
      .mockResolvedValueOnce({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "ERR",
        },
      })
      .mockResolvedValueOnce({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "INFO",
        },
      })
      .mockResolvedValueOnce({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "PASS",
        },
      }),

    getCheckedOutLocations: jest
      .fn()
      .mockResolvedValueOnce({
        data: [{ monPlanId: "testConfigId", facId: "testFacId" }],
      })
      .mockResolvedValueOnce({
        data: [],
      })
      .mockResolvedValue({
        data: [{ monPlanId: "testConfigId", facId: "testFacId" }],
      }),
  };
});
jest.mock("../../utils/api/facilityApi");
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
  checkout: false,
  user: { firstName: "test" },
  checkoutAPI: jest.fn().mockReturnValue(Promise.resolve({})),
  setCheckout: jest.fn(),
  setInactive: jest.fn(),
  inactive: false,
  setRevertedState: jest.fn(),
  configID: "testConfigId",
};

jest.setTimeout(30000);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("testing HeaderInfo component", () => {
  it("should render header and go through evaluation process", async () => {
    // render header
    await wait(() => {
      const header = render(<HeaderInfo {...props} />);
    });

    expect(screen.getByText("Check Back In")).toBeInTheDocument();

    // check-in config
    await wait(() => {
      const checkInBtn = screen.getByText("Check Back In");
      userEvent.click(checkInBtn);
    });

    expect(screen.getByText("Check Out")).toBeInTheDocument();

    // check-out config
    await wait(() => {
      const checkOutBtn = screen.getByText("Check Out");
      userEvent.click(checkOutBtn);
    });

    expect(screen.getByText("Check Back In")).toBeInTheDocument();
    expect(screen.getByText("Evaluate")).toBeInTheDocument();

    // click on evaluation button
    await wait(() => {
      const evalBtn = screen.getByText("Evaluate");
      userEvent.click(evalBtn);
    });

    expect(screen.getByText("In Queue")).toBeInTheDocument();

    // check statuses while evaluation process executes
    await wait(async () => {
      await timeout(config.app.refreshEvalStatusRate);
      expect(screen.getByText("In Queue")).toBeInTheDocument();

      await timeout(config.app.refreshEvalStatusRate);
      expect(screen.getByText("In Progress")).toBeInTheDocument();

      await timeout(config.app.refreshEvalStatusRate);
      expect(screen.getByText("Critical Errors")).toBeInTheDocument();

      await timeout(config.app.refreshEvalStatusRate);
      expect(screen.getByText("Informational Message")).toBeInTheDocument();

      await timeout(config.app.refreshEvalStatusRate);
      expect(screen.getByText("Passed")).toBeInTheDocument();
    });

    // click on evaluation status hyperlink
    await wait(() => {
      const statusLink = screen.getByText("Passed");
      userEvent.click(statusLink);
    });
  });
});
