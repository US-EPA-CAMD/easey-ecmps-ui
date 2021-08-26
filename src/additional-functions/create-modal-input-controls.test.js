import { modalViewData } from "./create-modal-input-controls";

describe("modalViewData function", () => {
  let selected = {
    sampleAcquisitionMethodCode: "ORF",
    active: true,
    basisCode: null,
    beginDate: "2019-07-01",
    beginHour: "0",
    componentRecordId: "TWCORNEL5-4EA39F9E01AB411EB84E313A212084C1",
    componentRecordIdentifier: "AFA",
    componentTypeCode: "GFFM",
    endDate: null,
    endHour: null,
    hgConverterIndicator: null,
    id: "TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3",
    manufacturer: "FLUIDID TECHNOLOGIES",
    modelVersion: "FAB-3161-2A",
    locationId: "6",
    monitoringSystemRecordId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
    serialNumber: "001-NG-FE-1000",
  };

  const label = {
    sampleAcquisitionMethodCode: ["Sample Acquistion Method", "dropdown", ""],
    basisCode: ["Basis Description", "dropdown", ""],
    componentRecordId: ["Component ID", "input", "required"],
    componentTypeCode: ["Component Type", "dropdown", "required"],
    hgConverterIndicator: ["Hg Converter Indicator", "radio", ""],
    hgConverterIndicator2: ["Hg Converter Indicator", "radio", "required"],
    manufacturer: ["Manufacturer", "input", ""],
    modelVersion: ["Modal or Version", "input", ""],
    serialNumber: ["Serial Number", "input", ""],
    break: ["Serial Number", "", ""],
    skip: ["Serial Number", "skip", ""],
  };
  const labelWithConditional = {
    sampleAcquisitionMethodCode: ["Sample Acquistion Method", "dropdown", ""],
    basisCode: ["Basis Description", "dropdown", ""],
    componentRecordId: ["Component ID", "input", "required"],
    componentTypeCode: ["Component Type", "dropdown", "required"],
    hgConverterIndicator: ["Hg Converter Indicator", "radio", "required"],
    hgConverterIndicator2: ["Hg Converter Indicator", "radio", ""],
    manufacturer: ["Manufacturer", "input", ""],
    modelVersion: ["Modal or Version", "input", ""],
    serialNumber: ["Serial Number", "input", ""],
    break: ["Serial Number", "", ""],
    skip: ["Serial Number", "skip", ""],
  };
  const time = {
    beginDate: ["Start Date", "date", "required"],
    beginHour: ["Start Time", "time", "required"],
    endDate: ["End Date", "date", ""],
    endHour: ["End Time", "time", ""],
  };
  let createNew = false;
  it("returns an array of the control inputs ", () => {
    expect(modalViewData(selected, label, time, createNew).length).toBe(14);
  });
  it("test coniditonals ", () => {
    expect(modalViewData(null, labelWithConditional, time, true).length).toBe(
      14
    );
  });
});
