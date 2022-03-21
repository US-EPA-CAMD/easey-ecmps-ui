import { displayAppError, hideAppError } from "./app-error";
import React from "react";
import { render } from "@testing-library/react";

class Valid extends React.Component {
  render() {
    return (
      <div>
        <h1 id="appErrorMessageText"></h1>;
        <svg tabIndex={-1} />
        <h1 id="appErrorMessage"></h1>;
      </div>
    );
  }
}

class Conditional extends React.Component {
  render() {
    return (
      <div>
        <h1 id=""></h1>;<h1 id=""></h1>;
      </div>
    );
  }
}
describe("app error functions", () => {
  it("should test with a valid query", () => {
    const { container } = render(<Valid />);

    displayAppError("test");

    hideAppError();

    const test = container.querySelector("#appErrorMessageText");

    expect(test).toBeDefined();
  });

  it("should test without a valid query", () => {
    const { container } = render(<Conditional />);

    displayAppError("test");

    hideAppError();

    const test = container.querySelector("h1");

    expect(test).toBeDefined();
  });
});
