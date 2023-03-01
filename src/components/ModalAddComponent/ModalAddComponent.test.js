import React from "react";
import {
  render,
  waitForElement,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import ModalAddComponent from "./ModalAddComponent";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../config";

const mock = new MockAdapter(axios);

const idRegex = '[\\w\\-]+';

const comps = {};

const getMonitoringComponents = new RegExp(`${config.services.monitorPlans.uri}/locations/${idRegex}/components`)
const getMonitoringSystemsComponentsUrl = new RegExp(`${config.services.monitorPlans.uri}/locations/${idRegex}/systems/${idRegex}/components`)

mock.onGet(getMonitoringComponents).reply(200, comps)
mock.onGet(getMonitoringSystemsComponentsUrl).reply(200, comps)

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


test("renders ModalAddComponent with back button", async () => {
  let { container } = await waitForElement(() => componentRenderer(true));

  const backBtn = await screen.findByRole('button', { name: /Back/i });
  expect(backBtn).toBeEnabled();
  userEvent.click(backBtn);

  expect(container).toBeDefined();
});

test("renders ModalAddComponent with no back button", async () => {
  let { container } = await waitForElement(() => componentRenderer(false));
  expect(container).toBeDefined();
});

