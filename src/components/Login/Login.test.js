import { render, screen, wait, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import Login from "./Login";

// mock get function to return a fa
jest.mock("js-cookie", () => {
  return {
    get: jest.fn(() => false),
  };
});

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
      .mockRejectedValueOnce(errorWithResponse),
  };
});

test("renders and tests Login component", async () => {
  // render component
  render(<Login isModal={false} />);

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
  await wait(async () => {
    const hidePwdBtn = btns[1];
    expect(hidePwdBtn).not.toBeDisabled();
    userEvent.click(hidePwdBtn);
    userEvent.click(hidePwdBtn);
  });

  // login button
  const loginBtn = btns[0];
  expect(loginBtn).not.toBeDisabled();

  // successful login
  await wait(async () => {
    userEvent.click(loginBtn);
  });

  // login response contains error
  await wait(async () => {
    userEvent.click(loginBtn);
  });

  // receives authentication error with a response
  await wait(async () => {
    userEvent.click(loginBtn);
  });

  // receives authentication error without a response
  await wait(async () => {
    userEvent.click(loginBtn);
  });

  // clear username & password fields
  fireEvent.change(usernameInput, { target: { value: "" } });
  fireEvent.change(passwordInput, { target: { value: "" } });

  // fails form validation (due to blank fields)
  await wait(async () => {
    userEvent.click(loginBtn);
  });
});
