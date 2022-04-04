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
let create = undefined;
beforeAll(() => {
  modalData = {
    id: "30343",
    unitId: "10",
    commercialOperationDate: "1951-08-13",
    operationDate: "1951-08-12",
    boilerTurbineType: "T",
    boilerTurbineBeginDate: "1951-08-12",
    boilerTurbineEndDate: null,
    maximumHourlyHeatInputCapacity: "622.0",
    beginDate: "2002-10-31",
    endDate: null,
    userId: "PQA09Q1",
    addDate: "2009-02-20",
    updateDate: null,
    active: true,
  };
  data = [
    [
      "commercialOperationDate",
      "Commercial Operation Date",
      "08/13/1951",
      false,
      "locked",
    ],
    ["operationDate", "Operation Date", "08/12/1951", false, "locked"],
    ["boilerTurbineType", "Boiler/Turbine Type", "T", false, "locked"],
    [[], [], [], "", "skip"],
    [
      "boilerTurbineBeginDate",
      "Boiler/Turbine Begin Date",
      "08/12/1951",
      false,
      "locked",
    ],
    ["boilerTurbineEndDate", "Boiler/Turbine End Date", "", false, "locked"],
    [
      "maximumHourlyHeatInputCapacity",
      "Maximum Hourly Heat Input Capacity",
      "622.0",
      false,
      "input",
    ],
    ["ozoneSeasonIndicator", "Ozone Season Indicator", null, false, "radio"],
    ["ozoneSeasonIndicator", "Ozone Season Indicator", null, false, "time"],
    [
      "parameterCode",
      "Parameter",
      "CO2 Hourly Mass Rate (ton/hr)",
      false,
      "mainDropdown",
      "CO2",
      [
        {
          code: "",
          name: "-- Select a value --",
        },
      ],
    ],
    [
      "monitoringMethodCode",
      "Methodology",
      "Appendix D",
      false,
      "dropdown",
      "AD",
      [
        {
          code: "",
          name: "-- Select a value --",
        },
      ],
    ],
    [
      "parameterCode",
      "Parameter",
      "CO2 Hourly Mass Rate (ton/hr)",
      false,
      "mainDropdown",
      "CO2",
      [
        {
          code: "",
          name: "-- Select a value --",
        },
      ],
    ],
    [
      "monitoringMethodCode",
      "Methodology",
      "Appendix D",
      false,
      "independentDropdown",
      "AD",
      [
        {
          code: "",
          name: "-- Select a value --",
        },
      ],
    ],
    [[], [], [], "", "skip"],
    ["beginDate", "Start Date", "10/31/2002", false, "date", "2002-10-31"],
    ["endDate", "End Date", "", false, "date", null],
  ];
  cols = 2;
  title = "Unit Capacity";
  viewOnly = true;
  backBtn = undefined;
  create = undefined;
});
describe("rendering a modal pop up detail ", () => {
  test("renders view only ", () => {
    const { container } = render(
      <ModalDetails
        modalData={modalData}
        data={data}
        cols={cols}
        title={title}
        viewOnly={false}
        backBtn={jest.fn()}
        create={true}
      />
    );
    const labels = container.querySelectorAll(".grid-col");

    fireEvent.click(container.querySelector("#backBtn"));
    expect(labels.length).toEqual(16);
  });
  test("renders create only", () => {
    const { container } = render(
      <ModalDetails
        modalData={modalData}
        data={data}
        cols={1}
        title={title}
        viewOnly={true}
        backBtn={undefined}
        create={false}
      />
    );
    const labels = container.querySelectorAll(".grid-col");

    expect(labels.length).toEqual(16);
  });

  test("renders view and create false", () => {
    const { container } = render(
      <ModalDetails
        modalData={modalData}
        data={data}
        cols={1}
        title={title}
        viewOnly={false}
        backBtn={undefined}
        create={false}
      />
    );
    const labels = container.querySelectorAll(".grid-col");

    expect(labels.length).toEqual(16);
  });
});
