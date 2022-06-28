import React from "react";
import { render } from "@testing-library/react";
import QAImportModalSelect from "./QAImportModalSelect";

test("testing QAImportModalSelect component", () => {
  const { container } = render(
    <QAImportModalSelect setImportTypeSelection={jest.fn()} />
  );

  expect(container).toBeDefined();
});
