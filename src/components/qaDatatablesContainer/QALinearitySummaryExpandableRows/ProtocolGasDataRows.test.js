import React from "react";
import { render, waitForElement, screen, fireEvent } from "@testing-library/react";

import ProtocolGasDataRows from "./ProtocolGasDataRows";

const axios = require("axios");
jest.mock("axios");

const props = {
  user: null,
  data: { locationId: 'locationId', id: 'id' }
}

const data = [
  {
    "id": "id1",
    "testSumId": "testSumId1",
    "userId": "userId1",
    "addDate": "addDate1",
    "updateDate": "updateDate1",
    "gasLevelCode": "xyzSortedSecond",
    "gasTypeCode": "gasTypeCode1",
    "vendorID": "vendorID1",
    "cylinderID": "cylinderID1",
    "expirationDate": "2022-08-10T16:24:18.663Z"
  },
  {
    "id": "id2",
    "testSumId": "testSumId2",
    "userId": "userId2",
    "addDate": "addDate2",
    "updateDate": "updateDate2",
    "gasLevelCode": "abcSortedFirst",
    "gasTypeCode": "gasTypeCode2",
    "vendorID": "vendorID2",
    "cylinderID": "cylinderID2",
    "expirationDate": "2022-08-10T16:24:18.663Z"
  }
]

test('renders ProtocolGasDataRows.js', () => {
  // Arrange
  axios.get.mockResolvedValueOnce({ status: 200, data })
  const { container } = render(<ProtocolGasDataRows {...props} />)

  // Assert
  expect(container).toBeDefined()
})
