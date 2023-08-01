import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MultiSelectCombobox, {
  DEBOUNCE_MILLISECONDS,
} from "./MultiSelectCombobox";

// Mock debounce function to avoid waiting during tests
jest.mock("lodash", () => ({
  debounce: (fn) => fn,
}));

const items = [
  { id: 1, label: "Item 1", enabled: true, selected: false },
  { id: 2, label: "Item 2", enabled: true, selected: false },
  { id: 3, label: "Item 3", enabled: true, selected: false },
];

describe("MultiSelectCombobox", () => {
  it("renders without crashing", () => {
    render(
      <MultiSelectCombobox
        items={items}
        label="Test Combobox"
        entity="test"
        onChangeUpdate={() => {}}
        searchBy="contains"
      />
    );

    expect(screen.getByText("Test Combobox")).toBeInTheDocument();
  });

  it("filters items correctly based on input", () => {
    render(
      <MultiSelectCombobox
        items={items}
        label="Test Combobox"
        entity="test"
        onChangeUpdate={() => {}}
        searchBy="contains"
      />
    );

    const input = screen.getByTestId("test-input-search");

    fireEvent.change(input, { target: { value: "2" } });

    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("calls onChangeUpdate with debounce", () => {
    jest.useFakeTimers();

    const onChangeUpdateMock = jest.fn();
    render(
      <MultiSelectCombobox
        items={items}
        label="Test Combobox"
        entity="test"
        onChangeUpdate={onChangeUpdateMock}
        searchBy="contains"
      />
    );

    const input = screen.getByTestId("test-input-search");

    fireEvent.change(input, { target: { value: "2" } });
    expect(onChangeUpdateMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(DEBOUNCE_MILLISECONDS);

    const options = screen.getAllByTestId("test-multi-select-option-0");
    expect(options).toHaveLength(1);

    fireEvent.click(options[0]);

    expect(onChangeUpdateMock).toHaveBeenCalledWith("2", "add");
  });
  it("opens and closes the listbox correctly", () => {
    render(
      <MultiSelectCombobox
        items={items}
        label="Test Combobox"
        entity="test"
        onChangeUpdate={() => {}}
        searchBy="contains"
      />
    );

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("test-input-search"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows the selected items correctly", async () => {
    render(
      <MultiSelectCombobox
        items={items}
        label="Test Combobox"
        entity="test"
        onChangeUpdate={jest.fn()}
        searchBy="contains"
      />
    );

    const input = screen.getByTestId("test-input-search");

    fireEvent.change(input, { target: { value: "I" } });

    await waitFor(() => {
      expect(
        screen.queryByTestId("test-multi-select-option-1")
      ).toBeInTheDocument();
    });
  });
  it("adds and removes items correctly", () => {
    render(
      <MultiSelectCombobox
        items={items}
        label="Test Combobox"
        entity="test"
        onChangeUpdate={jest.fn()}
        searchBy="contains"
      />
    );

    const input = screen.getByTestId("test-input-search");

    fireEvent.change(input, { target: { value: "I" } });

    const options = screen.getAllByTestId("test-multi-select-option-1");
    expect(options).toHaveLength(1);
    fireEvent.click(options[0]);

    const selectedItem = document.getElementsByClassName("selected");

    fireEvent.click(screen.getByTestId("2-remove"));

    expect(screen.queryByTestId("test-1-selected-pill")).toBeNull();
  });
});
