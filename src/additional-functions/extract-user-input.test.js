import { extractUserInput, validateUserInput } from "./extract-user-input";
import React from "react";
import { Radio } from "@trussworks/react-uswds";
import { render } from "@testing-library/react";

class Test extends React.Component {
  render() {
    return (
      <div>
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
          name="Start Date"
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
}

describe("extract user functions", () => {
  it("should test with valid input", () => {
    const { container } = render(<Test />);

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

  it("should test with valid radios", () => {
    const { container } = render(<Test />);

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
      beginDate: '03/22/2023',
      beginHour: 0,
      endDate: '03/23/2023',
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
})