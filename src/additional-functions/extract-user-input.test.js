import { extractUserInput, validateUserInput } from "./extract-user-input";
import React from "react";
import { Radio } from "@trussworks/react-uswds";
import { act, render, screen } from "@testing-library/react";

const Test = () => {
  return (
    <div data-testid="container">
      <input
        className="modalUserInput"
        id="Parameter"
        epadataname="parameterCode"
        value="Parameter"
      />
      <input
        className="modalUserInput"
        id="Pr"
        epadataname="prCode"
        value=""
      />
      <h1 className="modalUserInput" id="" epadataname="parameterCode">
        Parameter
      </h1>
      <input
        className="usa-date-picker__internal-input"
        epadataname="beginDate"
        epa-testid="beginDate"
        name="Begin Date"
        value={parseInt(1)}
      />
      <Radio
        name="secondNormalIndicator2"
        label={"secondNormalIndicator2"}
        key={`key2`}
      />
      <Radio
        name="secondNormalIndicator"
        label={"secondNormalIndicator"}
        value={1}
        key={`key`}
      />
    </div>
  );
}

describe("extract user functions", () => {
  it("should test with valid input", async () => {
    await act(async () => {
      render(<Test />);
    });

    const container = screen.getByTestId("container");
    const input = {
      parameterCode: "CO2",
      prCode: "test",
      beginDate: "2014-10-01",
      secondNormalIndicator: 1,
      secondNormalIndicator2: 0,
    };
    extractUserInput(input, ".modalUserInput", undefined);

    const test = container.querySelector(".modalUserInput");

    expect(test).toBeDefined();
  });

  it("should test with valid radios", async () => {
    await act(async () => {
      render(<Test />);
    });

    const container = screen.getByTestId("container");
    const input = {
      parameterCode: "CO2",
      prCode: "test",
      beginDate: "2014-10-01",
    };
    extractUserInput(input, ".modalUserInput", [
      "secondNormalIndicator,secondNormalIndicator2",
    ]);

    const test = container.querySelector(".modalUserInput");

    expect(test).toBeDefined();
  });
});

describe("validateUserInput", () => {
  const dataTableName = "Formula";
  test("given valid data then returns no errors", () => {
    const validInput = {
      beginDate: '2023-03-22',
      beginHour: 0,
      endDate: '2023-03-23',
      endHour: 0
    }
    const errors = validateUserInput(validInput, dataTableName)
    expect(errors).toHaveLength(0)
  })

  test("given invalid data then returns errors", () => {
    const invalidInput = {
      beginDate: null,
      beginHour: 0
    }
    const errors = validateUserInput(invalidInput, dataTableName)
    expect(errors).not.toHaveLength(0)
  })

  test('given begin date that comes before end date then returns no errors', () => {
    const validInput = {
      beginDate: '2023-01-01',
      endDate: '2023-12-31'
    }
    const errors = validateUserInput(validInput, dataTableName)
    expect(errors).toHaveLength(0)
  })

  test('given begin date that comes after end date then returns errors', () => {
    const invalidInput = {
      beginDate: '2023-12-31',
      endDate: '2023-01-01'
    }
    const errors = validateUserInput(invalidInput, dataTableName)
    expect(errors).not.toHaveLength(0)
  })

  test('given same begin/end dates and begin hour that comes after end hour then returns errors', () => {
    const invalidInput = {
      beginDate: '2023-11-11',
      endDate: '2023-11-11',
      beginHour: 20,
      endHour: 5,
    }
    const errors = validateUserInput(invalidInput, dataTableName)
    expect(errors).not.toHaveLength(0)
  })

  test("given invalid data for WAF edge case then returns errors", () => {
    const invalidInput = {
      wafEndDate: null,
      wafEndHour: 0,
    };
    const wafTableName = "Rectangular Duct WAF";
    const errors = validateUserInput(invalidInput, wafTableName);
    expect(errors).toHaveLength(1);
  })
})
