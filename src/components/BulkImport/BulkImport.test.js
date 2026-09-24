import React from "react";
import { render } from "@testing-library/react";

import { getLatestImport } from "../../utils/api/camdServices";
import BulkImport from "./BulkImport";

jest.mock("../../utils/api/camdServices", () => ({
  getLatestImport: jest.fn(),
}));
jest.mock("./LatestImport", () => () => null);
jest.mock("./NewImportModal", () => () => null);

test("sets the browser tab title", () => {
  getLatestImport.mockReturnValue(new Promise(() => {}));

  render(<BulkImport user={{ userId: "user-1" }} />);

  expect(document.title).toBe("Bulk Import");
});
