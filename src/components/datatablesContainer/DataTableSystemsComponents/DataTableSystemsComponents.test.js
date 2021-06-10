import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTableSystemsComponents } from "./DataTableSystemsComponents";

//testing redux connected component to mimic props passed as argument
function componentRenderer(showActiveOnly) {
  const props = {
    monitoringSystems: [{
      "id": "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
      "monLocId": "6",
      "systemType": "GAS",
      "systemDesignationCode": "P",
      "systemIdentifier": "AF1",
      "fuelCode": "PNG",
      "beginDate": "2019-07-01",
      "endDate": null,
      "beginHour": "0",
      "endHour": null
    },
    {
      "id": "TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12",
      "monLocId": "6",
      "systemType": "GAS",
      "systemDesignationCode": "P",
      "systemIdentifier": "AF2",
      "fuelCode": "PNG",
      "beginDate": "2019-07-01",
      "endDate": null,
      "beginHour": "0",
      "endHour": null
    }],
    monitoringSystemsComponents: [
      [
        {
          id: "TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC",
          monLocId: "6",
          componentTypeCode: "TEMP",
          basisCode: null,
          modelVersion: "RTT1SS-T1SA1-EN",
          manufacturer: "SCHNEIDER",
          serialNumber: "17301602",
          hgConverterInd: null,
          acquisitionMethodCode: "ORF",
          componentIdentifier: "AFF",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
        {
          id: "TWCORNEL5-15BBE0B7C475434887739E964E45EDD3",
          monLocId: "6",
          componentTypeCode: "TEMP",
          basisCode: null,
          modelVersion: "RTT1SS-T1SA1-EN",
          manufacturer: "SCHNEIDER",
          serialNumber: "17301603",
          hgConverterInd: null,
          acquisitionMethodCode: "ORF",
          componentIdentifier: "AFG",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
        {
          id: "TWCORNEL5-4EA39F9E01AB411EB84E313A212084C1",
          monLocId: "6",
          componentTypeCode: "GFFM",
          basisCode: null,
          modelVersion: "FAB-3161-2A",
          manufacturer: "FLUIDID TECHNOLOGIES",
          serialNumber: "001-NG-FE-1000",
          hgConverterInd: null,
          acquisitionMethodCode: "ORF",
          componentIdentifier: "AFA",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
        {
          id: "TWCORNEL5-62ADD2B9EBE14827A7A4DDFE317D00BE",
          monLocId: "6",
          componentTypeCode: "PRES",
          basisCode: null,
          modelVersion: "IGP10S-T52E1FD",
          manufacturer: "FOXBORO",
          serialNumber: "17300937",
          hgConverterInd: null,
          acquisitionMethodCode: "ORF",
          componentIdentifier: "AFC",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
        {
          id: "TWCORNEL5-83652BC8FACA47B08F904836032CA7A6",
          monLocId: "6",
          componentTypeCode: "DP",
          basisCode: null,
          modelVersion: "IDP10S-T22C21FD",
          manufacturer: "FOXBORO",
          serialNumber: "17300932",
          hgConverterInd: null,
          acquisitionMethodCode: "ORF",
          componentIdentifier: "AFD",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
        {
          id: "TWCORNEL5-AC759DF85E834751A04991EBBD8071A3",
          monLocId: "6",
          componentTypeCode: "DP",
          basisCode: null,
          modelVersion: "IDP10S-T22C21FD",
          manufacturer: "FOXBORO",
          serialNumber: "17300933",
          hgConverterInd: null,
          acquisitionMethodCode: "ORF",
          componentIdentifier: "AFE",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
        {
          id: "TWCORNEL5-BEEEEEF364094199A572406CCAD339B0",
          monLocId: "6",
          componentTypeCode: "PRES",
          basisCode: null,
          modelVersion: "IGP10S-T52E1FD",
          manufacturer: "FOXBORO",
          serialNumber: "17300936",
          hgConverterInd: null,
          acquisitionMethodCode: "ORF",
          componentIdentifier: "AFB",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
        {
          id: "TWCORNEL5-FADC4E3E593A4AB3B006F6F1B7C9F7DA",
          monLocId: "6",
          componentTypeCode: "DAHS",
          basisCode: null,
          modelVersion: "CEMS",
          manufacturer: "APCO",
          serialNumber: null,
          hgConverterInd: null,
          acquisitionMethodCode: null,
          componentIdentifier: "XX4",
          beginDate: "2019-07-01",
          beginHour: "0",
          endDate: null,
          endHour: null,
          Active: true,
        },
      ],
    ],
    loadMonitoringSystemsComponentsData:jest.fn(),
    loading: false,
    systemID:0,
    showActiveOnly: showActiveOnly,
  };
  return render(<DataTableSystemsComponents {...props} />);
}
function componentRendererNoData(args) {
  const defualtProps = {
    loading: true,
    showActiveOnly: true,
    monitoringSystems: [],
    monitoringSystemsComponents: [],
    systemID:0,
    loadMonitoringSystemsComponentsData:jest.fn(),

  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableSystemsComponents {...props} />);
}

// test("should render only active monitoring methods by default", () => {
//   const { container } = componentRenderer(true);
//   const records = container.querySelectorAll("tbody tr");
//   expect(records.length).toEqual(1);
// });

// test("should render both active and inactive monitoring methods when showActive only property is false", () => {
//   const { container } = componentRenderer(false);
//   const records = container.querySelectorAll("tbody tr");
//   expect(records.length).toEqual(3);
// });

// test("testing redux connected data-table component renders no records", () => {
//   const { container } = componentRendererNoData();
//   expect(screen.getByText("Loading list of System Components")).toBeInTheDocument();
// });
