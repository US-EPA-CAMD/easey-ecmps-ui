import React from "react";
import {
  MonitoringPlanTab,
  mapStateToProps,
  mapDispatchToProps,
} from "./MonitoringPlanTab";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
jest.mock("../../store/actions/dynamicFacilityTab");
import * as actions from "../../store/actions/dynamicFacilityTab";

jest.mock("../../store/actions/activeTab");
import * as activeTabCall from "../../store/actions/activeTab";
//testing redux connected component to mimic props passed as argument
const mockStore = configureMockStore();
const store = mockStore({});
configure({ adapter: new Adapter() });
describe("Shallow render to avoid issues with redux store ", () => {
  it("should render without throwing an error", () => {
    const facilities = [
      { orisCode: 3, name: "Barry", state: "Alabama" },
      { orisCode: 8, name: "Gorgas", state: "Alabama" },
      { orisCode: 9, name: "Copper Station", state: "Washington" },
    ];
    const monitoringPlans = [
      {
        id: "6",
        name: "1",
        locations: [
          { id: "x", name: "location1" },
          { id: "y", name: "location2" },
        ],
      },
      { id: "7", name: "2" },
      { id: "8", name: "3" },
    ];

    const defaultProps = {
      orisCode: 5,
      selectedConfig: {
        id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
        name: "110",
        locations: [
          {
            id: "65",
            name: "110",
            type: "Unit",
            active: false,
            retireDate: null,
            links: [
              {
                rel: "self",
                href:
                  "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65",
              },
              {
                rel: "methods",
                href:
                  "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/methods",
              },
              {
                rel: "systems",
                href:
                  "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/systems",
              },
              {
                rel: "spans",
                href:
                  "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/65/spans",
              },
            ],
          },
        ],
        endReportPeriodId: "24",
        active: false,
        links: [
          {
            rel: "self",
            href:
              "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/MDC-7C15B3D1B20542C3B54DD57F03A516E5",
          },
        ],
      },

      title: "( test ) ",
      locations: [],
      user: { firstName: "test" },
      checkout: false,

      tabs: [
        {
          orisCode: 1,
          name: "test",
          checkout: false,
          inactive: [false, true],

          section: [3, "Methods"],
          location: [0, "65"],
          selectedConfig: {
            id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
            name: "110",
            locations: [
              {
                id: "65",
                name: "110",
                type: "Unit",
                active: false,
                retireDate: null,
              },
            ],
            active: false,
          },
        },
      ],
      setActiveTab: jest.fn(),
      activeTab: [0],
      setSection: jest.fn(),
      setCheckout: jest.fn(),
      setLocation: jest.fn(),
      setInactive: jest.fn(),
    };
    const props = { ...defaultProps };
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    actionProps.setLocation();
    expect(actions.setLocationSelectionState).toHaveBeenCalled();
    actionProps.setSection();
    expect(actions.setSectionSelectionState).toHaveBeenCalled();
    actionProps.setActiveTab();
    expect(activeTabCall.setActiveTab).toHaveBeenCalled();
    actionProps.setInactive();
    expect(actions.setInactiveState).toHaveBeenCalled();
    actionProps.setCheckout();
    expect(actions.setCheckoutState).toHaveBeenCalled();

    const state = jest.fn();
    const stateProps = mapStateToProps(state);

    const wrapper = mount(<MonitoringPlanTab {...props} />);

    wrapper.setProps({
      tabs: [
        {
          orisCode: 1,
          name: "( test ) ",
          checkout: false,
          inactive: [false, true],

          section: [4, "Systes"],
          location: [1, "655"],
          selectedConfig: {
            id: "1",
            name: "1101",
            locations: [
              {
                id: "655",
                name: "110",
                type: "Unit",
                active: false,
                retireDate: null,
              },
            ],
            active: false,
          },
        },
      ],
    });
    expect(wrapper.find("MonitoringPlanTabRender")).toHaveLength(1);
  });
});
