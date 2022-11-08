import React from "react";
import { act, render, screen } from "@testing-library/react";
import { EmissionsImportTypeModalContent } from "./EmissionsImportTypeModalContent";

describe("EmissionsImportTypeModalContent Test", () => {
  it("render component with proper text", async () => {
    await act(async () => {
      render(<EmissionsImportTypeModalContent onChange={() => null} />);
    });

    expect(screen.queryByText("Import Historical or File Data")).toBeDefined();
    expect(screen.queryByText("Import From File")).toBeDefined();
    expect(screen.queryByText("Import From Historical Data")).toBeDefined();
  });
});
