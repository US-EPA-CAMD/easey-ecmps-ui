import monitoringMethodsReducer from "./monitoringMethods";
import * as actions from "../actions/monitoringMethods";

it("should update state with list of monitoring methods when passed LOAD_MONITORING_METHODS_SUCCESS", () => {
  // arrange
  const initialState = {
    monitoringMethods: {
        methods: [],
        matsMethods:[]
    },
  };

  const monitoringMethods = [
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    },
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    },
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    }
];

  const action = actions.loadMonitoringMethodsSuccess(monitoringMethods);
  const newState = monitoringMethodsReducer(initialState.monitoringMethods, action);
  expect(newState.methods.length).toEqual(3);
});
