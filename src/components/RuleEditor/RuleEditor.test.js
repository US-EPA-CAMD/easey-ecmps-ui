import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import RuleEditor from "./RuleEditor.js";

describe("<RuleEditor />", () => {
  test("renders RuleEditor", () => {
    const { container, queryByPlaceholderText } = render(<RuleEditor />);

    expect(container).toBeDefined();
  });
});
