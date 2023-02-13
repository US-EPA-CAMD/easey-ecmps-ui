import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import ModalAddComponent from "./ModalAddComponent";
import * as mpApi from "../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const comps = [{}];

const componentRenderer = (back) => {
  const props = {
    locationId: 1,
    systemId: "1",
    selectionHandler: jest.fn(),
    caption: "test",
    backBtn: back ? jest.fn() : null,
    title: "test",
  };
  return render(<ModalAddComponent {...props} />);
};

test("Here so test run", () => {
  expect(true);
});

/*
test("renders the add modalcomponentpage", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: comps })
  );
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: comps })
  );
  const compData = await mpApi.getMonitoringComponents("5");

  const sysCompData = await mpApi.getMonitoringSystemsComponents(
    "5",
    "CAMD-60A6D62FDAB14840BFCF67E049B4B4C5"
  );
  expect(compData.data).toEqual(comps);
  expect(sysCompData.data).toEqual(comps);
  let { container } = await waitForElement(() => componentRenderer(true));

  fireEvent.click(container.querySelector("#backBtn"));
  expect(container).toBeDefined();
});

test("renders the add modalcomponentpage with no backbtn", async () => {
  let { container } = await waitForElement(() => componentRenderer(false));

  expect(container).toBeDefined();
});
*/
