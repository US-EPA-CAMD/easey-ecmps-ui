import React from "react";
import { render, screen, wait } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import configureStore from "../../store/configureStore.dev";
import HeaderInfo from "./HeaderInfo";
import { Provider } from "react-redux";
import { EMISSIONS_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

import {storeForEmissionsModule} from "./jsonsForTests";

jest.mock("downloadjs", () => {
  return {
    download: jest.fn(),
  };
});

jest.mock("../../utils/api/quartzApi", () => {
  return {
    triggerEvaluation: jest.fn().mockResolvedValue({}),
  };
});
jest.mock("../../utils/api/monitoringPlansApi", () => {
  return {
    getMonitoringPlanById: jest
      .fn()
      .mockResolvedValue({ data: { facId: "testFacId", name: "testName" } }),
    revertOfficialRecord: jest.fn().mockResolvedValue({}),
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
      })
      .mockResolvedValue({
        data: {
          userid: "testUserId",
          updateDate: "1/1/1111",
          facId: "testFacId",
          evalStatusCode: "EVAL",
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
jest.mock("../../utils/api/emissionsApi", () => {
  return {
    getEmissionsReviewSubmit: jest.fn(null),
    exportEmissionsData: jest.fn().mockResolvedValue([]),
    exportEmissionsDataDownload: jest.fn().mockResolvedValue([]),
    getEmissionViewData: jest.fn().mockResolvedValue([]),
    getViews: jest.fn().mockResolvedValue([]),
    getEmissionsSchema: jest.fn().mockResolvedValue([]),
    importEmissionsData: jest.fn().mockResolvedValue([]),
  }
})
jest.mock("../../utils/api/facilityApi", () => {
  return {
    getFacilityById: jest
      .fn()
      .mockResolvedValue({ data: { facilityName: "testFacName" } }),
  };
});
jest.mock("axios");

const date = new Date();
const dateString = date.toString();

const selectedConfig = {
  id: "testConfigId",
  userId: "testUserId",
  updateDate: dateString,
  addDate: dateString,
  active: true,
  unitStackConfigurations:[{unitId:1}]
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

// mocking JavaScript built-in window functions
window.open = jest.fn().mockReturnValue({ close: jest.fn() });
window.scrollTo = jest.fn();

const oneMin = 60000;
jest.setTimeout(oneMin);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const jsonFile = new File(["{}"], "test.json");

let header;


describe("testing HeaderInfo component", () => {
  const store = configureStore();

  beforeEach(async () => {
    jest.clearAllMocks();
  
    await wait(() => {
      header = render(
      <Provider store={store}>
      <HeaderInfo {...props} />
      </Provider>
      );
    });
  });
  
  afterEach(() => {
    header = null;
  });
  
  // ------------------------------- //

  /*** TESTING EVALUATION PROCESS ***/
  it("should go through evaluation process", async () => {
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
});



  /*** TESTING EXPORT FUNCTIONALITY ***/
   it("should test the export modal", async () => {
    expect(screen.getByText("Export Data")).toBeInTheDocument();

    // export config
    await wait(() => {
      const exportBtn = screen.getByText("Export Data");
      userEvent.click(exportBtn);
    });
  }); 

   /*** TESTING IMPORT FUNCTIONALITY ***/
   it("should test the import modal", async () => {
    expect(screen.getByText("Import Data")).toBeInTheDocument();

    // import config
     await wait(() => {
       const importBtn = screen.getByText("Import Data");
       userEvent.click(importBtn);
     });
   });

   /*** TESTING REVERT FUNCTIONALITY ***/
   it('should test the revert modal' , async () => {
    expect(screen.getByText("Revert to Official Record")).toBeInTheDocument();

    // open revert modal
    await wait(() => {
      const revertBtn = screen.getByText("Revert to Official Record");
      userEvent.click(revertBtn);
    });
   });
});

describe("testing HeaderInfo Emissions Module", ()=>{

  console.log("was here 1")
  const store = configureStore(storeForEmissionsModule);
  console.log(store)

  beforeEach(async () => {
    jest.clearAllMocks();
  
    await wait(() => {
      header = render(
      <Provider store={store}>
      <HeaderInfo {...props } workspaceSection={EMISSIONS_STORE_NAME} />
      </Provider>
      );
    });
  });
  
  afterEach(() => {
    header = null;
  });

  it("should render view template dropdown", ()=>{
    expect(screen.getByLabelText("View Template")).toBeInTheDocument();
  })

  it("should render Apply Filter button", ()=>{
    expect(screen.getByText("Apply Filter(s)")).toBeInTheDocument();
  })

  it("should render Reporting Periods dropdown", ()=>{
    expect(screen.getByLabelText("Reporting Period(s)")).toBeInTheDocument();
  })

  it("should render Locations dropdown", ()=>{
    expect(screen.getByLabelText("Locations")).toBeInTheDocument();
  })

})