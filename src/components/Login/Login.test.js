import { render, screen, waitForElement } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import Login from "./Login";

// mock authenticate method
jest.mock("../../utils/api/easeyAuthApi", () => {
  const errorWithResponse = new Error("Error occurred while authenticating.");
  const res = {
    data: {
      message: "Authentication error occurred with a response",
    },
  };
  errorWithResponse["response"] = res;
  return {
    authenticate: jest
      .fn()
      .mockResolvedValueOnce({
        error: false,
      })
      .mockResolvedValueOnce({
        error: true,
      })
      .mockRejectedValueOnce(new Error("Error occurred while authenticating."))
      // .mockRejectedValueOnce(new Error("Error occurred while authenticating."))
      .mockRejectedValueOnce(errorWithResponse),
  };
});

test("renders and tests Login form (modal)", async () => {
  // render component
  render(<Login isModal={true} />);

  // click on create an account link
  const createAcc = screen.getByText("create an account");
  expect(createAcc).not.toBeDisabled();
  userEvent.click(createAcc);

  // click on forgot username link
  const forgotUser = screen.getByText("Forgot username?");
  expect(forgotUser).not.toBeDisabled();
  userEvent.click(forgotUser);

  // click on forgot password link
  const forgotPwd = screen.getByText("Forgot password?");
  expect(forgotPwd).not.toBeDisabled();
  userEvent.click(forgotPwd);

  // username
  const usernameInput = screen.getByLabelText("Username");
  expect(usernameInput).not.toBeDisabled();
  userEvent.type(usernameInput, "myusername");

  // password
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).not.toBeDisabled();
  userEvent.type(passwordInput, "pass1234");

  const btns = screen.getAllByRole("button");

  // click on hide password toggle
  await waitForElement(async () => {
    const hidePwdBtn = btns[1];
    expect(hidePwdBtn).not.toBeDisabled();
    userEvent.click(hidePwdBtn);
  });

  // login button
  const loginBtn = btns[0];
  expect(loginBtn).not.toBeDisabled();

  // attempt login (success)
  await waitForElement(async () => {
    userEvent.click(loginBtn);
  });

  // attempt login (response contains error)
  await waitForElement(async () => {
    userEvent.click(loginBtn);
  });

  // attempt login (authentication error with response)
  await waitForElement(async () => {
    userEvent.click(loginBtn);
  });

  // attempt login (authentication error without response)
  await waitForElement(async () => {
    userEvent.click(loginBtn);
  });
});
