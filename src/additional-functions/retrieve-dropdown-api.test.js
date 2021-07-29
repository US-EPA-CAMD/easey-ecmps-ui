import {useRetrieveDropdownApi} from "./retrieve-dropdown-api";
import React from "react";
import * as dmApi from "../utils/api/dataManagementApi";
const axios = require("axios");
jest.mock("axios");

afterAll(() => {
  jest.restoreAllMocks();
});

const data = [1];
test("tests a configuration with only active systems", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: data })
  );
  React.useState = jest.fn().mockReturnValueOnce([{}, {}]);

  const dataReturned = await dmApi.getAllParameterCodes();
  expect(dataReturned.data).toEqual(data);

  let func = useRetrieveDropdownApi(["parameterCode"]);

  expect(func).toEqual(data);
  //   let { container } = await waitForElement(() => componentRenderer());
  //   expect(container).toBeDefined();
});

// describe("useRetrieveDropdownApi functions", () => {
//   const row = {
//     col1: "Inactive",
//     cells: [{ value: "Inactive", column: "Status" }],
//   };

//   const columns = ["Status"];

//   it("finds value in an array with null paraeter", () => {
//     expect(normalizeRowObjectFormat(row, columns).col1).toBe("Inactive");
//   });
// });
