import React from "react";
import { act, render, screen } from "@testing-library/react";
import EvaluateAndSubmit from "./EvaluateAndSubmit";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";

import * as easeyAuthApi from "../../utils/api/easeyAuthApi";
import * as monitorPlanApi from "../../utils/api/monitoringPlansApi";
import * as qaApi from "../../utils/api/qaCertificationsAPI";
import * as emissionsApi from "../../utils/api/emissionsApi";
import * as mdmApi from "../../utils/api/mdmApi";
import * as helperFunctions from "./utils/functions";
import * as contentApi from "../../utils/api/contentApi";
import * as camdServices from "../../utils/api/camdServices";
import {
  mockCertEventsEvalAndSubmit,
  mockEmissionsEvalAndSubmit,
  mockTestExtensionEvalAndSubmit,
  mockTestSummaryEvalAndSubmit,
} from "./mocks/mocks";
import {
  getMockMonitorPlanConfigurations,
  getMockEcmpsUser,
  getMockReportingPeriods,
  getMockFacilityDropwdownList,
} from "../../mocks/functions";

jest.mock("../../additional-functions/checkout", () => ({
  //Alternative way to mock modules, since there is just one function in this file it is simpler to mock this way
  checkoutAPI: jest.fn(),
}));

const store = configureStore(); //Wrap the component with the redux store provider to simulate actual redux behavior [Redux should never be mocked!]

//Identifies the test suite we are about to run, In this case it is End to End testing for the entire EvaluateAndSubmit pages
describe("- Evaluate And Submit -", () => {
  beforeEach(() => {
    //Initialize our mocks before each test, using beforeAll with spyOn does not mock correctly
    jest.spyOn(monitorPlanApi, "getMonitoringPlans").mockResolvedValue({
      data: getMockMonitorPlanConfigurations(),
    });
    jest.spyOn(monitorPlanApi, "getCheckedOutLocations").mockResolvedValue({
      data: [],
    });
    jest.spyOn(qaApi, "getQATestSummaryReviewSubmit").mockResolvedValue({
      data: [...mockTestSummaryEvalAndSubmit],
    });
    jest.spyOn(qaApi, "getQACertEventReviewSubmit").mockResolvedValue({
      data: [...mockCertEventsEvalAndSubmit],
    });
    jest.spyOn(qaApi, "getQATeeReviewSubmit").mockResolvedValue({
      data: [...mockTestExtensionEvalAndSubmit],
    });
    jest.spyOn(emissionsApi, "getEmissionsReviewSubmit").mockResolvedValue({
      data: [...mockEmissionsEvalAndSubmit],
    });
    jest.spyOn(mdmApi, "getReportingPeriods").mockResolvedValue({
      data: getMockReportingPeriods(),
    });
    jest
      .spyOn(helperFunctions, "getDropDownFacilities")
      .mockResolvedValue(getMockFacilityDropwdownList());
    jest.spyOn(contentApi, "getContent").mockResolvedValue({ data: "" });

    jest.spyOn(easeyAuthApi, "validate").mockResolvedValue({
      data: {
        hasValidationError: false,
        validationErrorHeading: "Validation Error",
        validationErrorMessage: "There was a validation error",
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Identifies a sub testing suite we are about to run within the larger testing suite [In this case there is one for Evaluate and one for Submission because this is a shared component that uses both]
  describe("Evaluate", () => {
    it("Should render the EvaluateAndSubmit [Evaluate] component without crashing", async () => {
      await act(async () => {
        //Wrap user interaction or rendering logic in an act whenever state changes or async actions in your component could be performed
        //Wrapping the render of our component in an asynchronous act because the useEffects' of the component perform async actions, and we need to process all state changes the render could cause before proceeding
        //For more information on when to use act() vs async act() see [https://medium.com/@bmb21/reacts-sync-and-async-act-caa297b658b0]
        render(
          <Provider store={store}>
            <EvaluateAndSubmit
              user={getMockEcmpsUser()}
              componentType="Evaluate"
              checkedOutLocations={[]}
            />
          </Provider>
        );
      });

      expect(screen.getByTestId("page-title").innerHTML).toBe("Evaluate"); //Using a data-testid tag for html elements that we want to make assertions on [Should always use these to query for specific elements]
      //Querying by data-testid over [tags / text / styling] is always preffered because [tags / text / styling] are changed frequently
    });
  });

  describe("Submission", () => {
    it("Should render the EvaluateAndSubmit [Submission] component without crashing", async () => {
      await act(async () => {
        render(
          <Provider store={store}>
            <EvaluateAndSubmit
              user={getMockEcmpsUser()}
              componentType="Submission"
              checkedOutLocations={[]}
            />
          </Provider>
        );
      });

      expect(screen.getByTestId("page-title").innerHTML).toBe("Submit");
    });
  });
});
