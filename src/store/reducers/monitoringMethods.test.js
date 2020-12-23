import monitoringMethodsReducer from "./monitoringMethods";
import * as actions from "../actions/monitoringMethods";


describe("Monitoring Methods Reducer State Update", () => {
  it("should update state with list of monitoring methods when passed LOAD_MONITORING_METHODS_SUCCESS", () => {
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

  it("should update state with list of monitoring mats methods when passed LOAD_MONITORING_MATSMETHODS_SUCCESS", () => {
    const initialState = {
      monitoringMethods: {
          methods: [],
          matsMethods:[]
      },
    };
    const monitoringMatsMethods = [
      {
        "id": "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        "parameter": "co2",
        "methodology": "ad",
        "beginDate": "1995-01-01 00",
        "endTime": "1995-01-01 00",
      },
      {
        "id": "TWCORNEL5-409EB09291144C14B2327FC63B413AAA",
        "parameter": "co2",
        "methodology": "ad",
        "beginDate": "1995-01-01 00",
        "endTime": "1995-01-01 00",
      }
    ];
    const action = actions.loadMonitoringMatsMethodsSuccess(monitoringMatsMethods);
    const newState = monitoringMethodsReducer(initialState.monitoringMethods, action);
    expect(newState.matsMethods.length).toEqual(2);
  });
});
