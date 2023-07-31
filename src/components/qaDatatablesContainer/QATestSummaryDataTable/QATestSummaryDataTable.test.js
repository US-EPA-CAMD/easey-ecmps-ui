import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import * as qaCertApi from "../../../utils/api/qaCertificationsAPI";
import * as dataManagementApi from "../../../utils/api/dataManagementApi";
import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";

import render from "../../../mocks/render"
import QATestSummaryDataTable from "./QATestSummaryDataTable";
import { getMockMonitoringComponents, getMockMonitoringSystems, getMockQATestSummary, getMockSpanScaleCodes, getMockTestReasonCodes, getMockTestResultCodes, getMockTestTypeCodes } from "../../../mocks/functions";

const locId = "locId";

const props = {
  locationSelectValue: locId,
  user: 'user',
  nonEditable: false,
  showModal: false,
  selectedTestCode: {
    testTypeCodes: ["UNITDEF"],
    testTypeGroupCode: 'APPESUM',
  },
  isCheckedOut: true,
  selectedLocation: '66',
  locations: [
    {
      id: "66",
      unitRecordId: 11,
      unitId: "1",
      stackPipeRecordId: null,
      stackPipeId: null,
      name: "1",
      type: "unit",
      active: true,
      activeDate: null,
      retireDate: null,
      nonLoadBasedIndicator: 0,
    },
  ],
  updateTable: false,
  setUpdateTable: jest.fn()
}

const mockCreateQATestData = jest.fn().mockResolvedValue({ data: { id: 'createdId', status: 200 } });

beforeEach(() => {
  // qaCertApi
  jest.spyOn(qaCertApi, "getQATestSummary").mockResolvedValue({
    data: getMockQATestSummary(),
  });
  // jest.spyOn(qaCertApi, "createQATestData").mockResolvedValue({
  //   data: { id: 'createdId' },
  // });
  jest.spyOn(qaCertApi, "createQATestData").mockImplementation(mockCreateQATestData)

  jest.spyOn(qaCertApi, "updateQALinearityTestSummary").mockResolvedValue({
    data: { id: 'updatedId' }
  })
  jest.spyOn(qaCertApi, "deleteQATestSummary").mockResolvedValue({
    data: 'deleted',
    status: 200
  });

  // dataManagementApi
  jest.spyOn(dataManagementApi, "getAllTestTypeCodes").mockResolvedValue({
    data: getMockTestTypeCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getAllSpanScaleCodes").mockResolvedValue({
    data: getMockSpanScaleCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getAllTestReasonCodes").mockResolvedValue({
    data: getMockTestReasonCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getAllTestResultCodes").mockResolvedValue({
    data: getMockTestResultCodes(),
    status: 200
  });
  jest.spyOn(dataManagementApi, "getPrefilteredTestSummaries").mockResolvedValue({
    data: getMockQATestSummary(),
    status: 200
  });

  // monitorPlanApi
  jest.spyOn(monitorPlanApi, "getMonitoringComponents").mockResolvedValue({
    data: getMockMonitoringComponents(),
    status: 200
  });
  jest.spyOn(monitorPlanApi, "getMonitoringSystems").mockResolvedValue({
    data: getMockMonitoringSystems(),
    status: 200
  });

  // mock window.scrollTo
  window.scrollTo = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks();
})

test("testing component renders properly and functionlity for add/edit/remove", async () => {
  await render(
    <QATestSummaryDataTable {...props} />
  )

  // Add
  // const addBtn = screen.getAllByRole("button", { name: /Add/i });
  // userEvent.click(addBtn[0]);
  // const addSaveBtn = screen.getByRole("button", { name: /Click to Save/i });
  // userEvent.click(addSaveBtn);
  // setTimeout(() => expect(mock.history.post.length).toBe(1), 1000);

  // // Edit
  // const editBtn = screen.getAllByRole("button", { name: /Edit/i });
  // expect(editBtn.length).not.toBe(0);
  // userEvent.click(editBtn[0]);
  // const editSaveBtn = screen.getByRole("button", { name: /Click to Save/i });
  // userEvent.click(editSaveBtn);
  // setTimeout(() => expect(mock.history.put.length).toBe(1), 1000);

  // // Remove
  // const removeBtn = screen.getAllByRole("button", { name: /Remove/i });
  // expect(removeBtn.length).not.toBe(0);
  // userEvent.click(removeBtn[0]);

  // const confirmBtn = screen.getByRole("button", { name: /Yes/i });
  // userEvent.click(confirmBtn);
  // setTimeout(() => expect(mock.history.delete.length).toBe(1), 1000);
});

test.only('functionality for add/edit/remove', async () => {
  jest.setTimeout(10000);
  await render(
    <QATestSummaryDataTable {...props} />
  )

  // Add
  const addBtn = screen.getByRole("button", { name: /Add/i });

  // userEvent.click(addBtn);
  await act(async () => addBtn.click())

  screen.debug(undefined, 3000000)

  const addSaveBtn = screen.getByRole("button", { name: /Click to Save/i });

  expect(addSaveBtn).toBeInTheDocument()
  // userEvent.click(addSaveBtn);
  await act(async () => addSaveBtn.click())


  expect(mockCreateQATestData).toHaveBeenCalled();
})

test('functionality for edit', async () => {
  jest.setTimeout(10000)
  await render(
    <QATestSummaryDataTable {...props} />
  )

  const editBtn = screen.getAllByRole("button", { name: /Edit/i });
  expect(editBtn.length).not.toBe(0);
  await act(async () => editBtn[0].click())
})

// test("testing component renders properly with RELACC ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "RELACC")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with APPESUM ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "APPESUM")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with FFLB ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "FFLB")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with FLC ", async () => {
//   jest.setTimeout(10000);
//   const { container } = await waitForElement(() =>
//     componentRender(true, "FLC")
//   );
//   expect(container).toBeDefined();
//   jest.setTimeout(5000);
// });
// test("testing component renders properly with OLOLCAL ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "OLOLCAL")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with CALINJ ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "CALINJ")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with FFACC ", async () => {
//   jest.setTimeout(10000);
//   const { container } = await waitForElement(() =>
//     componentRender(true, "FFACC")
//   );
//   expect(container).toBeDefined();
//   jest.setTimeout(5000);
// });
// test("testing component renders properly with CYCSUM ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "CYCSUM")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with FFACC ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "FFACC")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with TTACC ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "TTACC")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with FLR ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "FLR")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with FFL ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "FFL")
//   );
//   expect(container).toBeDefined();
// });
// test("testing component renders properly with HGL3LS ", async () => {
//   const { container } = await waitForElement(() =>
//     componentRender(true, "HGL3LS")
//   );
//   expect(container).toBeDefined();
// });
