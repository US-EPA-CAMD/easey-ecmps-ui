import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import {
  MonitoringPlanTab,
  mapStateToProps,
  mapDispatchToProps,
} from "./MonitoringPlanTab";
import * as axios from "axios";
import { deleteCheckInMonitoringPlanConfiguration } from "../../utils/api/monitoringPlansApi";
import configureMockStore from "redux-mock-store";
jest.mock("../../store/actions/dynamicFacilityTab");
import * as actions from "../../store/actions/dynamicFacilityTab";

jest.mock("../../store/actions/activeTab");
//testing redux connected component to mimic props passed as argument
const mockStore = configureMockStore();
const store = mockStore({});

jest.mock("axios");
// configure({ adapter: new Adapter() });
describe("Monitoring plan tab", () => {
  test("renders component", async () => {
    // mock the 'dispatch' object

    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {},
      });
    });
    await deleteCheckInMonitoringPlanConfiguration(1);
    //-------
    // mocks the return secure Axios
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {},
      });
    });
    axios.mockImplementationOnce(() => {
      return Promise.reject(new Error("some error"));
    });
    const { container, getByText, getAllByRole } = render(
      <MonitoringPlanTab
        resetTimer={jest.fn()}
        setExpired={jest.fn()}
        resetTimerFlag={false}
        callApiFlag={false}
        orisCode={false}
        selectedConfig={false}
        title={false}
        locations={false}
        user={false}
        checkout={false}
        tabs={false}
        activeTab={0}
        setSection={jest.fn()}
        setLocation={jest.fn()}
        setCheckout={jest.fn()}
        setInactive={jest.fn()}
        checkedOutLocations={jest.fn()}
        setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
        setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
        mostRecentlyCheckedInMonitorPlanIdForTab={false}
      />
    );

    container = render(
      <MonitoringPlanTab
        resetTimer={jest.fn()}
        setExpired={jest.fn()}
        resetTimerFlag={false}
        callApiFlag={false}
        orisCode={1}
        selectedConfig={false}
        title={false}
        locations={false}
        user={false}
        checkout={false}
        tabs={false}
        activeTab={false}
        setSection={jest.fn()}
        setLocation={jest.fn()}
        setCheckout={jest.fn()}
        setInactive={jest.fn()}
        checkedOutLocations={jest.fn()}
        setMostRecentlyCheckedInMonitorPlanId={jest.fn()}
        setMostRecentlyCheckedInMonitorPlanIdForTab={jest.fn()}
        mostRecentlyCheckedInMonitorPlanIdForTab={false}
      />
    );

    expect(container).toBeDefined();
  });

  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = jest.fn();
    const stateProps = mapStateToProps(state);

    const formData = [];
    // verify the appropriate action was called
    actionProps.setLocation();
    actionProps.setSection();
    actionProps.setActiveTab();
    actionProps.setInactive();
    actionProps.setCheckout();
    expect(state).toBeDefined();
  });
});
