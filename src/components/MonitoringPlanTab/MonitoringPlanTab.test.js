import React from "react";
import { MonitoringPlanTab } from "./MonitoringPlanTab";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import configureMockStore from "redux-mock-store";
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
      orisCode: 3,
      loading: false,
      facilities: facilities,
      monitoringPlans: [],
      loadFacilitiesData: jest.fn(),
      loadMonitoringPlansData: jest.fn(()=>{defaultProps.monitoringPlans=monitoringPlans}),
    };
    const props = { ...defaultProps };
    const wrapper = shallow(<MonitoringPlanTab {...props} />);
    expect(wrapper.find("MonitoringPlanTabRender")).toHaveLength(1);
  });
});
