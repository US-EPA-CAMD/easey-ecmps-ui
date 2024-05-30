import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import render from "../../mocks/render";
import * as easeyAuthApi from "../../utils/api/easeyAuthApi";

describe("login modal component", ()=>{
  beforeEach( async ()=>{
    await render(<Login isModal={false} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders component elements", async () => {
    const createAcctLink = screen.getByRole('link', { name: 'create an account' })
    expect(createAcctLink).toHaveAttribute('href', 'https://dev.epacdx.net/Registration/Terms')
    
    const forgotUserNameLink = screen.getByRole('link', { name: 'Forgot User ID?' })
    expect(forgotUserNameLink).toHaveAttribute('href', 'https://dev.epacdx.net/AccountRecovery/ForgotUserId')

    //const forgotPwdLink = screen.getByRole('link', { name: 'Forgot password?' })
    //expect(forgotPwdLink).toHaveAttribute('href', 'https://dev.epacdx.net/PasswordReset/GetResetCode');

    // show/hide password
    //const showHidePasswordBtn = screen.getByTestId("showHidePasswordBtn");
    //expect(showHidePasswordBtn).not.toBeDisabled();
    //await userEvent.click(showHidePasswordBtn);
    //const passwordInput = screen.getByTestId("component-login-password");
    //show
    //expect(passwordInput.type).toBe("text");
    //await userEvent.click(showHidePasswordBtn);
    //hide
    //expect(passwordInput.type).toBe("password");
  });

  it("tests user authentication", async () =>{
    const mockAuthenticate = jest.fn().mockResolvedValue({});

      jest
        .spyOn(easeyAuthApi, "determinePolicy")
        .mockImplementation(mockAuthenticate);
    // username
    const usernameInput = screen.getByTestId("component-login-username");
    expect(usernameInput).not.toBeDisabled();
    expect(usernameInput.type).toBe("text");
    await userEvent.type(usernameInput, "myusername");
    expect(usernameInput.value).toBe('myusername');
    // password
    /*const passwordInput = screen.getByTestId("component-login-password");
    expect(passwordInput).not.toBeDisabled();
    await userEvent.type(passwordInput, "pass1234");
    expect(passwordInput.value).toBe('pass1234');*/
    const loginBtn = screen.getByTestId("component-login-submit-button");
    expect(loginBtn).toBeInTheDocument();
    await userEvent.click(loginBtn);
    expect(mockAuthenticate).toHaveBeenCalled();
  });
  
});

