import React from "react";
import {
  render,
  waitForElement,
  screen,
  fireEvent,
} from "@testing-library/react";
import { DataTableSystemsComponents } from "./DataTableSystemsComponents";
import { mount, ReactWrapper, shallow } from "enzyme";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { TramRounded } from "@material-ui/icons";
const axios = require("axios");

jest.mock("axios");

const selectedSystem = [
  {
    active: true,
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    fuelCode: "PNG",
    id: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    systemDesignationCode: "P",
    systemIdentifier: "AF1",
    systemTypeCode: "GAS",
  },
  {
    active: true,
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    fuelCode: "PNG",
    id: "TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12",
    monLocId: "6",
    systemDesignationCode: "P",
    systemIdentifier: "AF2",
    systemTypeCode: "GAS",
  },
];
const apiFuel = [
  {
    id: "TWCORNEL5-346B541485484501A5C748F8CAAABC22",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    fuelCode: "PNG",
    systemTypeCode: "GAS",
    maxRate: "10000.0",
    maxRateSourceCode: "URV",
    sysFuelUomCode: "HSCF",
    beginDate: "2019-07-01",
    endDate: null,
    beginHour: "0",
    endHour: null,
    active: true,
  },
];
const apiComp = [
  {
    id: "TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3",
    componentId: "TWCORNEL5-4EA39F9E01AB411EB84E313A212084C1",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "AFA",
    componentTypeCode: "GFFM",
    basisCode: null,
    modelVersion: "FAB-3161-2A",
    manufacturer: "FLUIDID TECHNOLOGIES",
    serialNumber: "001-NG-FE-1000",
    hgConverterInd: null,
    acquisitionMethodCode: "ORF",
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-1E5992F39F084C53AC505D3AA7E6910F",
    componentId: "TWCORNEL5-BEEEEEF364094199A572406CCAD339B0",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "AFB",
    componentTypeCode: "PRES",
    basisCode: null,
    modelVersion: "IGP10S-T52E1FD",
    manufacturer: "FOXBORO",
    serialNumber: "17300936",
    hgConverterInd: null,
    acquisitionMethodCode: "ORF",
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-2C0D6A3BD0134EB08D517C13F4F29B2B",
    componentId: "TWCORNEL5-62ADD2B9EBE14827A7A4DDFE317D00BE",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "AFC",
    componentTypeCode: "PRES",
    basisCode: null,
    modelVersion: "IGP10S-T52E1FD",
    manufacturer: "FOXBORO",
    serialNumber: "17300937",
    hgConverterInd: null,
    acquisitionMethodCode: "ORF",
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-CEA2BF80166F4CB1890571BA9ED4ECB4",
    componentId: "TWCORNEL5-83652BC8FACA47B08F904836032CA7A6",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "AFD",
    componentTypeCode: "DP",
    basisCode: null,
    modelVersion: "IDP10S-T22C21FD",
    manufacturer: "FOXBORO",
    serialNumber: "17300932",
    hgConverterInd: null,
    acquisitionMethodCode: "ORF",
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-FE67CFECB6E946BFB5F80536B5D8359D",
    componentId: "TWCORNEL5-AC759DF85E834751A04991EBBD8071A3",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "AFE",
    componentTypeCode: "DP",
    basisCode: null,
    modelVersion: "IDP10S-T22C21FD",
    manufacturer: "FOXBORO",
    serialNumber: "17300933",
    hgConverterInd: null,
    acquisitionMethodCode: "ORF",
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-DDDA16031A6B44A3BF38FCFF52B82668",
    componentId: "TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "AFF",
    componentTypeCode: "TEMP",
    basisCode: null,
    modelVersion: "RTT1SS-T1SA1-EN",
    manufacturer: "SCHNEIDER",
    serialNumber: "17301602",
    hgConverterInd: null,
    acquisitionMethodCode: "ORF",
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-2DBF3CEFE78142C0996F32BB078C2F5A",
    componentId: "TWCORNEL5-15BBE0B7C475434887739E964E45EDD3",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "AFG",
    componentTypeCode: "TEMP",
    basisCode: null,
    modelVersion: "RTT1SS-T1SA1-EN",
    manufacturer: "SCHNEIDER",
    serialNumber: "17301603",
    hgConverterInd: null,
    acquisitionMethodCode: "ORF",
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
  {
    id: "TWCORNEL5-E3FA52B8BDD74A73B8F639158D38F147",
    componentId: "TWCORNEL5-FADC4E3E593A4AB3B006F6F1B7C9F7DA",
    monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    monLocId: "6",
    componentIdentifier: "XX4",
    componentTypeCode: "DAHS",
    basisCode: null,
    modelVersion: "CEMS",
    manufacturer: "APCO",
    serialNumber: null,
    hgConverterInd: null,
    acquisitionMethodCode: null,
    beginDate: "2019-07-01",
    beginHour: "0",
    endDate: null,
    endHour: null,
    active: true,
  },
];
//testing redux connected component to mimic props passed as argument
const componentRenderer = (checkout, secondLevel) => {
  const props = {
    systemID: "AF1",
    viewOnly: false,
    setSecondLevel: jest.fn(),
    secondLevel: secondLevel,
    locationSelectValue: 6,
    user: { firstName: "test" },
    checkout: checkout,
    setCreateBtn: jest.fn(),
  };
  return render(<DataTableSystemsComponents {...props} />);
};

test("tests getMonitoringSystems", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedSystem })
  );
  const title = await mpApi.getMonitoringSystems(6);
  expect(title.data).toEqual(selectedSystem);
  let { container } = await waitForElement(() =>
    componentRenderer(false, false)
  );
  // componentRenderer(6);
  expect(container).toBeDefined();
});
test("tests a getMonitoringSystemsComponents", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: apiComp })
  );
  const title = await mpApi.getMonitoringSystemsComponents(
    6,
    "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D"
  );

  const test = "";
  expect(title.data).toEqual(apiComp);
  // React.useState = jest
  //   .fn()
  // .mockReturnValueOnce([apiComp, {}])
  // .mockReturnValueOnce([true, {}])
  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([
  //   { monLocId: 6, id: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D" },
  //   {},
  // ])
  // .mockReturnValueOnce(["", {}])

  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([true, {}])

  // .mockReturnValueOnce([true, {}])
  // .mockReturnValueOnce([false, {}]);

  let { container, debug } = await waitForElement(() =>
    componentRenderer(false, false)
  );
  // debug();
  const fuelBtn = container.querySelector("#btnOpenSystemComponents");
  fireEvent.click(fuelBtn);
  expect(container.querySelector("#backBtn")).toBeDefined();
  // const First = false;
  // const second = "My Second Initial State";

  // const wrapper = mount(
  //   <DataTableSystemsComponents
  //     systemID={"AF1"}
  //     viewOnly={false}
  //     setSecondLevel={jest.fn()}
  //     secondLevel={true}
  //     locationSelectValue={6}
  //     user={{ firstName: "test" }}
  //     checkout={false}
  //     setCreateBtn={jest.fn()}
  //   />
  // );
  // await wrapper.instance();
  // const btn = wrapper.find("#btnOpenSystemComponents");

  // expect(btn).toBeDefined();
  // jest.restoreAllMocks();
});

test("tests a getMonitoringSystemsFuelFlows", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: apiFuel })
  );
  const title = await mpApi.getMonitoringSystemsFuelFlows(
    6,
    "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D"
  );
  expect(title.data).toEqual(apiFuel);
  const test = "";
  // React.useState = jest
  //   .fn()
  // .mockReturnValueOnce([apiFuel, {}])
  // .mockReturnValueOnce([true, {}])
  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([
  //   { monLocId: 6, id: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D" },
  //   {},
  // ])
  // .mockReturnValueOnce(["", {}])

  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([false, {}])

  // .mockReturnValueOnce([false, {}])
  // .mockReturnValueOnce([true, {}]);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false)
  );

  const fuelBtn = container.querySelectorAll("#btnOpenFuelFlows");

  for (const x of fuelBtn) {
    fireEvent.click(x);
  }

  expect(container.querySelector("#backBtn")).toBeDefined();
});
