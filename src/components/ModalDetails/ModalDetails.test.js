import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalDetails from "./ModalDetails";

let options = [];

let modalData = {};
let data = [];
let cols = 2;
let title = "";
let viewOnly = true;
let backBtn = undefined;
beforeAll(() => {
  modalData = {
    active: true,
    addDate: "2019-10-07",
    beginDate: "2018-07-01",
    beginHour: "6",
    bypassApproachCode: null,
    endDate: null,
    endHour: null,
    id: "TWCORNEL5-F5C722306BC647C0A89728805EC65491",
    monitoringMethodCode: "AD",
    monLocId: "6",
    parameterCode: "CO2",
    substituteDataCode: "FSP75",
    updateDate: "2021-07-14",
    userId: "testuser",
    hgConverterIndicator: null,
  };
  data = [
    [
      "parameterCode",
      "Parameter",
      "CO2 Hourly Mass Rate (ton/hr)",
      "required",
      "dropdown",
      "CO2",
      [
        {
          code: "select",
          name: "Select a Parameter... ",
        },
        {
          code: "",
          name: "",
        },
        {
          code: "AKSF",
          name: "Appendix K Sample to Stack Flow Scaling Factor",
        },
        {
          code: "BCO2",
          name: "Biogenic CO2 Mass (ton)",
        },
        {
          code: "BWA",
          name: "Moisture Fraction in Ambient Air",
        },
        {
          code: "CO2",
          name: "CO2 Hourly Mass Rate (ton/hr)",
        },
        {
          code: "CO2C",
          name: "CO2 Concentration (pct)",
        },
        {
          code: "SO2",
          name: "SO2 Hourly Mass Rate (ton/hr)",
        },
      ],
    ],
    [
      "monitoringMethodCode",
      "Methodology",
      "Appendix D",
      "required",
      "dropdown",
      "AD",
      [
        {
          code: "select",
          name: "Select a Method.. ",
        },
        {
          code: "",
          name: "",
        },
        {
          code: "AD",
          name: "Appendix D",
        },
        {
          code: "ADCALC",
          name: "Appendix D Measured and Apportioned",
        },
        {
          code: "AE",
          name: "Appendix E",
        },
        {
          code: "AMS",
          name: "Alternative Monitoring System",
        },
        {
          code: "CALC",
          name: "Apportioned or Summed Value",
        },
      ],
    ],
    [
      "substituteDataCode",
      "Substitute Data Approach",
      "Fuel-Specific Missing Data",
      "required",
      "dropdown",
      "FSP75",
      [
        {
          code: "select",
          name: "Select a Substitute Data Approach... ",
        },
        {
          code: "",
          name: "",
        },
        {
          code: "FSP75",
          name: "Fuel-Specific Missing Data",
        },
        {
          code: "FSP75C",
          name: "Fuel-Specific Missing Data with Separate Co-Fired Database",
        },
        {
          code: "MHHI",
          name:
            "Maximum Rated Hourly Heat Input Rate for LME Units Normal using Long Term Fuel Flow",
        },
        {
          code: "NLB",
          name: "Non Load-Based Missing Data",
        },
        {
          code: "NLBOP",
          name: "Non Load-Based Missing Data with Operational Bins",
        },
        {
          code: "OZN75",
          name: "Ozone vs Non-Ozone NOX Missing Data",
        },
        {
          code: "REV75",
          name: "Inverse Part 75 for H2O or O2 Missing Data",
        },
        {
          code: "SPTS",
          name: "Standard Part 75 for Missing Data",
        },
      ],
    ],
    [
      "bypassApproachCode",
      "Bypass Approach",
      "",
      "required",
      "dropdown",
      null,
      [
        {
          code: "select",
          name: "Select a Bypass Approach... ",
        },
        {
          code: "",
          name: "",
        },
        {
          code: "BYMAX",
          name: "Standard Part 75 for Unmonitored Bypass Stack",
        },
        {
          code: "BYMAXFS",
          name: "Fuel-Specific for Unmonitored Bypass Stack",
        },
      ],
    ],
    [
      "bypassApproachCode",
      "Bypass Approach",
      "",
      "required",
      "dropdown",
      null,
      null,
    ],
    ["beginDate", "Start Date", "07/01/2018", "required", "date", "2018-07-01"],
    ["beginHour", "Start Time", "6", "required", "time", "6"],
    ["endDate", "End Date", "", false, "date", null],

    ["hgConverterIndicator", "Hg Converter Indicator", true, false, "radio"],
    ["hgConverterIndicator", "Hg Converter Indicator", false, false, "radio"],
    ["endHour", "End Time", null, false, "time", null],
  ];
  cols = 2;
  title = "Component: Monitoring Methods";
  viewOnly = true;
  backBtn = undefined;
});
describe("rendering a modal pop up detail ", () => {
  test("renders view only ", () => {
    const { container } = render(
      <ModalDetails
        modalData={modalData}
        data={data}
        cols={cols}
        title={title}
        viewOnly={true}
        backBtn={undefined}
      />
    );
    const labels = container.querySelectorAll("label");

    expect(labels.length).toEqual(9);
  });

  test("renders 1 drop down with no initial value and no required text  ", () => {
    const editModal = {
      sampleAcquisitionMethodCode: "ORF",
      active: true,
      basisCode: null,
      beginDate: "2019-07-01",
      beginHour: "0",
      componentId: "TWCORNEL5-4EA39F9E01AB411EB84E313A212084C1",
      // componentId: "AFA",
      componentTypeCode: "GFFM",
      endDate: null,
      endHour: null,
      hgConverterIndicator: null,
      id: "TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3",
      manufacturer: "FLUIDID TECHNOLOGIES",
      modelVersion: "FAB-3161-2A",
      monLocId: "6",
      monSysId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
      serialNumber: "001-NG-FE-1000",
    };

    const editData = [
      ["componentId", "Component ID", "AFA", "required", "input"],
      [
        "sampleAcquisitionMethodCode",
        "Sample Acquistion Method",
        " Orifice",
        false,
        "dropdown",
        "ORF",
        [{ code: "", name: "" }],
      ],
      // ["basisCode", "Basis Description", "", false, "dropdown", null, null],
      ["manufacturer", "Manufacturer", "FLUIDID TECHNOLOGIES", false, "input"],
      ["serialNumber", "Serial Number", false, false, "input"],
      ["hgConverterIndicator", "Hg Converter Indicator1", true, false, "radio"],
      [
        "hgConverterIndicator",
        "Hg Converter Indicator2",
        false,
        false,
        "radio",
      ],
      ["hgConverterIndicator", "Hg Converter Indicator3", null, false, "radio"],
      ["hgConverterIndicator", "Hg Converter Indicator4", null, false, ""],
      [
        "beginDate",
        "Start Date",
        "07/01/2019",
        "required",
        "date",
        "2019-07-01",
      ],
      ["beginHour", "Start Time", "0", "required", "time", "0"],
      ["endDate", "End Date", "", false, "date", null],
      ["endHour", "End Time", null, false, "time", null],
    ];
    const { container } = render(
      <ModalDetails
        modalData={editModal}
        data={editData}
        cols={cols}
        title={title}
        viewOnly={false}
        backBtn={jest.fn()}
      />
    );
    const labels = container.querySelectorAll("label");
    const btn = container.querySelector("#backBtn");
    btn.focus();
    fireEvent.click(btn);
    expect(btn).toBeDefined();
    expect(labels.length).toEqual(19);
  });

  test("renders 1 drop down with no modal values and no required text  ", () => {
    const editData = [
      ["componentIdentifier", "Component ID", "AFA", "required", "input"],
      [
        "acquisitionMethodCode",
        "Sample Acquistion Method",
        " Orifice",
        false,
        "dropdown",
        "ORF",
        [{ code: "", name: "" }],
      ],
      ["basisCode", "Basis Description", "", false, "dropdown", null, null],
      ["manufacturer", "Manufacturer", "FLUIDID TECHNOLOGIES", false, "input"],
      ["serialNumber", "Serial Number", false, false, "input"],
      ["hgConverterInd", "Hg Converter Indicator1", true, false, "radio"],
      ["hgConverterInd", "Hg Converter Indicator2", false, false, "radio"],
      ["hgConverterInd", "Hg Converter Indicator3", null, false, "radio"],
      ["hgConverterInd", "Hg Converter Indicator4", null, false, ""],
      [
        "beginDate",
        "Start Date",
        "07/01/2019",
        "required",
        "date",
        "2019-07-01",
      ],
      ["beginHour", "Start Time", "0", "required", "time", "0"],
      ["endDate", "End Date", "", false, "date", null],
      ["endHour", "End Time", null, false, "time", null],
    ];
    const { container } = render(
      <ModalDetails
        modalData={null}
        data={editData}
        cols={cols}
        title={title}
        viewOnly={false}
        backBtn={jest.fn()}
      />
    );
    const labels = container.querySelectorAll("label");

    expect(labels.length).toEqual(21);
  });
});
