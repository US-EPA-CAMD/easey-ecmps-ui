import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import render from "../../mocks/render";
import * as easeyAuthApi from "../../utils/api/easeyAuthApi";

describe("login modal component", ()=>{

  beforeEach( async ()=>{
    await render(<Login isModal={false} showSystemNotification={false}  />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders component elements", async () => {
    const createAcctLink = screen.getByRole('link', { name: 'create an account' })
    expect(createAcctLink).toHaveAttribute('href', 'https://dev.epacdx.net/Registration/Terms')
    
    const forgotUserNameLink = screen.getByRole('link', { name: 'Forgot User ID?' })
    expect(forgotUserNameLink).toHaveAttribute('href', 'https://dev.epacdx.net/AccountRecovery/ForgotUserId')
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

    const loginBtn = screen.getByTestId("component-login-submit-button");
    expect(loginBtn).toBeInTheDocument();
    await userEvent.click(loginBtn);
    expect(mockAuthenticate).toHaveBeenCalled();
  });
  
});

