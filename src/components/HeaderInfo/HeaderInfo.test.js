import React from "react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import configureStore from "../../store/configureStore.dev";
import HeaderInfo from "./HeaderInfo";
import { Provider } from "react-redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

import { storeForEmissionsModule } from "./HeaderInfo.test.mocks";
import config from "../../config";

const mock = new MockAdapter(axios);

jest.mock("downloadjs", () => {
  return {
    download: jest.fn(),
  };
});

const idRegex = '[\\w\\-]+'
const mpUrl = config.services.monitorPlans.uri;
const emissionsUrl = config.services.emissions.uri

const getRefreshInfoResp = {
  userid: "testUserId",
  updateDate: "1/1/1111",
  facId: "testFacId",
  evalStatusCode: "EVAL",
}

const triggerEvaluationUrl = `${config.services.quartz.uri}/triggers/evaluations/monitor-plans`
const getMonitoringPlanByIdUrl = new RegExp(`${mpUrl}/plans/export?planId=${idRegex}`)
const revertOfficialRecordUrl = new RegExp(`${mpUrl}/workspace/plans/${idRegex}/revert`)
const getRefreshInfoUrl = new RegExp(`${mpUrl}/workspace/plans/${idRegex}`)
const getCheckedOutLocationsUrl = new RegExp(`${mpUrl}/workspace/check-outs/plans`)
const emissionsExportUrl = new RegExp(`${emissionsUrl}/emissions/export?monitorPlanId=MDC-613AD75BF31C4B9EA561E42E38A458DE&year=2022&quarter=4`)
const emissionsExportUrlFull = "https://api.epa.gov/easey/dev/emissions-mgmt/emissions/export?monitorPlanId=MDC-613AD75BF31C4B9EA561E42E38A458DE&year=2022&quarter=4"
const getFacilityByIdUrl = new RegExp(`${config.services.facilities.uri}/facilities/${idRegex}`)

const getViewTemplatesUrl = `${config.services.emissions.uri}/emissions/views`

mock.onPost(triggerEvaluationUrl).reply(200, {})
mock.onGet(getMonitoringPlanByIdUrl).reply(200, { facId: "testFacId", name: "testName" })
mock.onDelete(revertOfficialRecordUrl).reply(200, 'reverted')
mock.onGet(getRefreshInfoUrl).reply(200, getRefreshInfoResp)
mock.onGet(getCheckedOutLocationsUrl).reply(200, [{ monPlanId: "testConfigId", facId: "testFacId" }])
mock.onGet(emissionsExportUrl).reply(200, [])
mock.onGet(emissionsExportUrlFull).reply(200, [])
mock.onGet(getFacilityByIdUrl).reply(200, { facilityName: "testFacName" })
mock.onGet(getViewTemplatesUrl).reply(200, [])

const date = new Date();
const dateString = date.toString();

const selectedConfig = {
  id: "testConfigId",
  userId: "testUserId",
  updateDate: dateString,
  addDate: dateString,
  active: true,
  unitStackConfigurations: [{ unitId: 1 }]
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
  configID: "MDC-613AD75BF31C4B9EA561E42E38A458DE",
};

// mocking JavaScript built-in window functions
window.open = jest.fn().mockReturnValue({ close: jest.fn() });
window.scrollTo = jest.fn();

const oneMin = 60000;
jest.setTimeout(oneMin);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const jsonFile = new File(["{}"], "test.json");

const store = configureStore(storeForEmissionsModule);

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <HeaderInfo {...props} workspaceSection={EMISSIONS_STORE_NAME} />
    </Provider>
  );
}


describe("testing HeaderInfo component", () => {
  /*** TESTING EVALUATION PROCESS ***/
  it("should go through evaluation process", async () => {
    renderComponent();
    const checkBackInText = await screen.findByText(/Check Back In/i);
    expect(checkBackInText).toBeInTheDocument()

    // click on evaluation button
    const evalBtn = screen.getByRole('button', { name: /Evaluate/i })
    userEvent.click(evalBtn);

    const inQueueText = await screen.findByText(/In Queue/i)
    expect(inQueueText).toBeInTheDocument();
  });

  /*** TESTING EXPORT FUNCTIONALITY ***/
  it("should test the export modal", async () => {
    renderComponent();
    const exportDataText = await screen.findByText(/Export Data/i);
    expect(exportDataText).toBeInTheDocument();

    // export config
    const exportBtn = screen.getByRole('button', { name: /Export Data/i })
    userEvent.click(exportBtn)
  });

  /*** TESTING IMPORT FUNCTIONALITY ***/
  it("should test the import modal", async () => {
    renderComponent()
    const importDataText = await screen.findByText(/Import Data/i);
    expect(importDataText).toBeInTheDocument();

    // import config
    const importBtn = screen.getByRole('button', { name: /Import Data/i });
    userEvent.click(importBtn);
  });

  /*** TESTING REVERT FUNCTIONALITY ***/
  it('should test the revert modal', async () => {
    renderComponent();
    const revertText = await screen.findByText(/Revert to Official Record/i)
    expect(revertText).toBeInTheDocument();

    // open revert modal
    const revertBtn = screen.getByRole('button', { name: /Revert to Official Record/i })
    userEvent.click(revertBtn);
  });
});

describe("testing HeaderInfo Emissions Module", () => {

  it("should render view template dropdown", async () => {
    renderComponent();
    const viewTemplateBtn = await screen.findByLabelText("View Template");
    expect(viewTemplateBtn).toBeInTheDocument();
  })

  it("should render Apply Filter button", async () => {
    renderComponent();
    const applyFilterBtn = await screen.findByText("Apply Filter(s)");
    expect(applyFilterBtn).toBeInTheDocument();
  })

  it("should render Reporting Periods dropdown", async () => {
    renderComponent();
    const reportingPeriodsDropdown = await screen.findByLabelText("Reporting Period(s)");
    expect(reportingPeriodsDropdown).toBeInTheDocument();
  })

  it("should render Locations dropdown", async () => {
    renderComponent();
    const locationsDropdown = await screen.findByLabelText("Locations");
    expect(locationsDropdown).toBeInTheDocument();
  })

})