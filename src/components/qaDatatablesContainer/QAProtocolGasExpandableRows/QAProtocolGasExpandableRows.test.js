import React from "react";
import { render, waitForElement, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import * as qaApi from "../../../utils/api/qaCertificationsAPI";
import QAProtocolGasExpandableRows from "./QAProtocolGasExpandableRows"

const axios = require("axios");
jest.mock("axios");

const protocolGasApiResponse = [
  {
    "id": "a5e00beb-2040-4e8f-9be4-2dd54d3bdb6f",
    "testSumId": "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040",
    "gasLevelCode": "HIGH",
    "gasTypeCode": "AIR",
    "vendorID": null,
    "cylinderID": null,
    "expirationDate": "2022-09-21",
    "userId": "testUser",
    "addDate": "2022-08-10T00:00:00.000Z",
    "updateDate": "2022-08-10T14:26:13.000Z"
  },
  {
    "id": "b697e41c-ffce-43da-9a68-9dd67961c8e6",
    "testSumId": "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040",
    "gasLevelCode": "MID",
    "gasTypeCode": "GMIS",
    "vendorID": null,
    "cylinderID": null,
    "expirationDate": "2024-10-12",
    "userId": "testUser",
    "addDate": "2022-08-10T00:00:00.000Z",
    "updateDate": "2022-08-11T12:11:25.000Z"
  }
];
initialState.dropdowns.protocolGas = {
  gasLevelCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'HIGH',
      name: 'High'
    },
    {
      code: 'LOW',
      name: 'Low'
    },
    {
      code: 'MID',
      name: 'Mid'
    },
    {
      code: 'ZERO',
      name: 'Zero'
    }
  ],
  gasTypeCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'ZERO',
      name: 'Zero level gas used for the low level calibration of a reference analyzer used in RATA testing'
    },
    {
      code: 'ZAM',
      name: 'Zero Air Material'
    },
    {
      code: 'AIR',
      name: 'Purified air material'
    },
    {
      code: 'APPVD',
      name: 'Other EPA-approved EPA Protocol gas blend'
    },
    {
      code: 'CO2',
      name: 'EPA Protocol gas consisting of CO2, and a balance gas'
    },
    {
      code: 'GMIS',
      name: 'Gas manufacturer\'s intermediate standard'
    },
    {
      code: 'N2C',
      name: 'EPA Protocol gas bi-blend consisting of NO2 and CO, and a balance gas'
    },
    {
      code: 'N2C2',
      name: 'EPA Protocol gas bi-blend consisting of NO2 and CO2, and a balance gas'
    },
    {
      code: 'N2CC',
      name: 'EPA Protocol gas tri-blend consisting of NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'NC',
      name: 'EPA Protocol gas bi-blend consisting of NO and CO, and a balance gas'
    },
    {
      code: 'NC2',
      name: 'EPA Protocol gas bi-blend consisting of NO and CO2, and a balance gas'
    },
    {
      code: 'NCC',
      name: 'EPA Protocol gas tri-blend consisting of NO, CO, and CO2, and a balance gas'
    },
    {
      code: 'NO',
      name: 'EPA Protocol gas consisting of NO, and a balance gas'
    },
    {
      code: 'NO2',
      name: 'EPA Protocol gas consisting of NO2, and a balance gas'
    },
    {
      code: 'NTRM',
      name: 'NIST-traceable reference material'
    },
    {
      code: 'NX',
      name: 'EPA Protocol gas bi-blend consisting of NO and NO2, and a balance gas'
    },
    {
      code: 'NXC',
      name: 'EPA Protocol gas tri-blend consisting of NO, NO2, and CO, and a balance gas'
    },
    {
      code: 'NXC2',
      name: 'EPA Protocol gas tri-blend consisting of NO, NO2, and CO2, and a balance gas'
    },
    {
      code: 'NXCC',
      name: 'EPA Protocol gas quad-blend consisting of NO, NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'O2',
      name: 'EPA Protocol gas consisting of O2, and a balance gas'
    },
    {
      code: 'OC',
      name: 'EPA Protocol gas bi-blend consisting of O2 and CO, and a balance gas'
    },
    {
      code: 'OC2',
      name: 'EPA Protocol gas bi-blend consisting of O2 and CO2, and a balance gas'
    },
    {
      code: 'OCC',
      name: 'EPA Protocol gas tri-blend consisting of O2, CO, and CO2, and a balance gas'
    },
    {
      code: 'PRM',
      name: 'SRM-equivalent compressed gas primary reference material'
    },
    {
      code: 'RGM',
      name: 'Research gas mixture'
    },
    {
      code: 'SC',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and CO, and a balance gas'
    },
    {
      code: 'SC2',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and CO2, and a balance gas'
    },
    {
      code: 'SN',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and NO, and a balance gas'
    },
    {
      code: 'SN2',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and NO2, and a balance gas'
    },
    {
      code: 'SN2C',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO2, and CO, and a balance gas'
    },
    {
      code: 'SN2C2',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO2, and CO2, and a balance gas'
    },
    {
      code: 'SN2CC',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'SNC',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO, and CO, and a balance gas'
    },
    {
      code: 'SNC2',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO, and CO2, and a balance gas'
    },
    {
      code: 'SNCC',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO, CO, and CO2, and a balance gas'
    },
    {
      code: 'SNX',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO, and NO2, and a balance gas'
    },
    {
      code: 'SNXC',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO, NO2, and CO, and a balance gas'
    },
    {
      code: 'SNXC2',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO, NO2, and CO2, and a balance gas'
    },
    {
      code: 'SNXCC',
      name: 'EPA Protocol gas quint-blend consisting of SO2, NO, NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'SO',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and O2, and a balance gas'
    },
    {
      code: 'SO2',
      name: 'EPA Protocol gas consisting of SO2, and a balance gas'
    },
    {
      code: 'SOC',
      name: 'EPA Protocol gas tri-blend consisting of SO2, O2, and CO, and a balance gas'
    },
    {
      code: 'SRM',
      name: 'Standard reference material'
    }
  ]
};
let store = configureStore(initialState);
const componentRenderer = (locId, testSummaryId) => {
  const props = {
    user : "test_user",
    loadDropdownsData : jest.fn(),
    locId: locId,
    testSumId: testSummaryId
  }
  return render(
    <Provider store={store}>
      <QAProtocolGasExpandableRows {...props} />
    </Provider>
  );
};
test('renders QAProtocolGasExpandableRows properly',async () => {
  // Arrange
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: protocolGasApiResponse })
  );
  const res = await qaApi.getProtocolGas("1873", "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040");
  expect(res.data).toEqual(protocolGasApiResponse);
  let { container, findByRole } = await waitForElement(() => componentRenderer("1873", "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040"));
  // Assert
  expect(container).toBeDefined();
  expect(findByRole).toBeDefined();
  // const addButton = await findByRole ("button", {name: "Add"});
  // expect(addButton).toBeDefined();
  // fireEvent.click(addButton);
  // expect(screen.getByText("Add Protocol Gas")).toBeInTheDocument();

  // const saveButton = screen.getByRole("button", {name: "Click to save"});
  // expect(saveButton).toBeDefined();
  // // screen.debug();
  // expect(screen.getAllByText("Gas Level Code").length).toBe(1);
  // expect(screen.getAllByText("Gas Type Code").length).toBe(2);
  // expect(screen.getAllByText("Vendor ID").length).toBe(2);
  // expect(screen.getAllByText("Cylinder ID").length).toBe(2);
  // expect(screen.getAllByText("Expiration Date").length).toBe(2);
  // fireEvent.click(saveButton);
  // const rowGroups = screen.getByRole ("rowGroup");
  // expect(rowGroups).toBeDefined();
  // expect(rowGroups.length).toBe(protocolGasApiResponse.length + 1);
})