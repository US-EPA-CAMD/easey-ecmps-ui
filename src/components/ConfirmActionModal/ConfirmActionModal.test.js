import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ConfirmActionModal from "./ConfirmActionModal";

const buttonText = "Open Modal";
const confirmText = "Yes";
const cancelText = "Cancel";

/**
 * FIXME: These tests are all failing since `@trussworks/react-uswds` started requiring `focus-trap-react` for their modals. Will need to find a workaround for the error that is thrown in (testing environments only).
 */

test.skip("renders a button with text", () => {
  render(
    <ConfirmActionModal
      buttonText={buttonText}
      row={{ col1: "col1", col4: "col4", col9: "col9" }}
      dataTableName="Test Summary Data"
    />
  );
  const button = screen.getByRole("button", { name: "Remove for col4" });
  expect(button).toBeInTheDocument();
});

test.skip("when the confirm button is clicked then the onConfirm handler is called", async () => {
  const onConfirm = jest.fn();
  render(
    <ConfirmActionModal
      buttonText={buttonText}
      confirmText={confirmText}
      onConfirm={onConfirm}
      row={{ col1: "col1", col4: "col4", col9: "col9" }}
      dataTableName="Test Summary Data"
    />
  );
  const button = screen.getByRole("button", { name: "Remove for col4" });
  await act(async () => {
    button.click();
  });
  const confirm = screen.getByRole("button", { name: /yes/i });
  await act(async () => {
    confirm.click();
  });
  expect(onConfirm).toHaveBeenCalledTimes(1);
});

test.skip("when the cancel button is clicked then the onCancel handler is called", async () => {
  const onCancel = jest.fn();
  render(
    <ConfirmActionModal
      buttonText={buttonText}
      cancelText={cancelText}
      onCancel={onCancel}
      row={{ col1: "col1", col4: "col4", col9: "col9" }}
      dataTableName="Test Summary Data"
    />
  );
  const button = screen.getByRole("button", { name: "Remove for col4" });
  await act(async () => {
    button.click();
  });
  const cancel = screen.getByRole("button", { name: cancelText });
  await act(async () => {
    cancel.click();
  });
  expect(onCancel).toHaveBeenCalledTimes(1);
});
