import React from "react";
import { render, screen } from "@testing-library/react";

import ConfirmActionModal from "./ConfirmActionModal";
import userEvent from "@testing-library/user-event";

const buttonText = 'Open Modal';
const confirmText = 'Yes';
const cancelText = 'Cancel'

test('renders a button with text', () => {

  render(<ConfirmActionModal buttonText={buttonText} row={{col1:"col1",col4:"col4",col9:"col9"}} dataTableName="Test Summary Data"/>)
  const button = screen.getByRole('button', { name: "Remove for col4" })
  expect(button).toBeInTheDocument();
})

test('when the confirm button is clicked then the onConfirm handler is called', () => {
  const onConfirm = jest.fn()
  render(<ConfirmActionModal buttonText={buttonText} confirmText={confirmText} onConfirm={onConfirm}  row={{col1:"col1",col4:"col4",col9:"col9"}} dataTableName="Test Summary Data"/>)
  const button = screen.getByRole('button', { name: "Remove for col4" })
  userEvent.click(button)
  const confirm = screen.getByRole('button', { name: /yes/i })
  userEvent.click(confirm)
  expect(onConfirm).toHaveBeenCalledTimes(1)
})

test('when the cancel button is clicked then the onCancel handler is called', () => {
  const onCancel = jest.fn()
  render(<ConfirmActionModal buttonText={buttonText} cancelText={cancelText} onCancel={onCancel}  row={{col1:"col1",col4:"col4",col9:"col9"}} dataTableName="Test Summary Data" />)
  const button = screen.getByRole('button', { name: "Remove for col4" })
  userEvent.click(button)
  const cancel = screen.getByRole('button', { name: cancelText })
  userEvent.click(cancel)
  expect(onCancel).toHaveBeenCalledTimes(1)
})
