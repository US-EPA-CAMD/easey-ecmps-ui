import React from "react";
import { screen, within, fireEvent } from "@testing-library/react";
import render from "../../mocks/render";

import ErrorFallbackModal from "./ErrorFallbackModal";

const error = {
  message: "error message"
};
const onReset = jest.fn();

describe("Test Error Fallback Modal", () => {
  it('renders all elements', async () => { 
    await  render(
        <ErrorFallbackModal 
          error={error} 
          resetErrorBoundary={onReset} 
        />
      );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    const header = within(dialog).getByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
    const alert = screen.getByTestId("alert");
    expect(alert).toBeInTheDocument();
    expect(within(alert).getByText(error.message)).toBeTruthy();
  
  });
  
  it('render the close button which triggers the onRest function to reload the page', async()=>{
    await  render(
      <ErrorFallbackModal 
        error={error} 
        resetErrorBoundary={onReset} 
      />
    );
    const closeBtn = screen.getByRole('button', { name: "Close" })
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

});

