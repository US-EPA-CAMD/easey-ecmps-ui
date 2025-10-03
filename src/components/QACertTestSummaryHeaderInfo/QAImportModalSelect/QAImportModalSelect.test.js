import React from "react";
import { render, screen } from "@testing-library/react";
import QAImportModalSelect from "./QAImportModalSelect";

describe("QAImportModalSelect Component", () => {
  const mockSetImportTypeSelection = jest.fn();

  beforeEach(() => {
    mockSetImportTypeSelection.mockClear();
  });
  test("testing QAImportModalSelect component renders", () => {
    const { container } = render(
    <QAImportModalSelect setImportTypeSelection={mockSetImportTypeSelection} />
  );

  expect(container).toBeDefined();
});

  test("should show historical import option for TEST entity type", () => {
    render(
      <QAImportModalSelect
        setImportTypeSelection={mockSetImportTypeSelection}
        entityType="TEST"
      />
    );

    expect(screen.getByText("Import Historical or File Data")).toBeInTheDocument();
    expect(screen.getByText("Import Historical Data")).toBeInTheDocument();
    expect(screen.getByText("Import from File")).toBeInTheDocument();
  });

  test("should show only file import option for QCE entity type", () => {
    render(
      <QAImportModalSelect
        setImportTypeSelection={mockSetImportTypeSelection}
        entityType="QCE"
      />
    );

    expect(screen.getByText("Import File Data")).toBeInTheDocument();
    expect(screen.getByText("Import from File")).toBeInTheDocument();
    expect(screen.queryByText("Import Historical Data")).not.toBeInTheDocument();
  });

  test("should show only file import option for TEE entity type", () => {
    render(
      <QAImportModalSelect
        setImportTypeSelection={mockSetImportTypeSelection}
        entityType="TEE"
      />
    );

    expect(screen.getByText("Import File Data")).toBeInTheDocument();
    expect(screen.getByText("Import from File")).toBeInTheDocument();
    expect(screen.queryByText("Import Historical Data")).not.toBeInTheDocument();
  });

  test("should default to TEST behavior when entityType not provided", () => {
    render(
      <QAImportModalSelect setImportTypeSelection={mockSetImportTypeSelection} />
    );

    expect(screen.getByText("Import Historical or File Data")).toBeInTheDocument();
    expect(screen.getByText("Import Historical Data")).toBeInTheDocument();
    expect(screen.getByText("Import from File")).toBeInTheDocument();
  });

  test("should use default caption for unknown entity types", () => {
    render(
      <QAImportModalSelect
        setImportTypeSelection={mockSetImportTypeSelection}
        entityType="UNKNOWN"
      />
    );

    expect(screen.getByText("Import File Data")).toBeInTheDocument();
    expect(screen.queryByText("Import Historical Data")).not.toBeInTheDocument();
  });
});