import React from "react";
import { fireEvent, render, screen, container } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { SubHeader } from "./SubHeader";
import { config } from "../../config";

describe("SubHeader Component", () => {
  test("Menu items render without errors", () => {
    render(
      <BrowserRouter>
        <SubHeader user={false} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );

    //Resources
    const resourcesMenuItem = screen.getAllByText("Resources");
    expect(resourcesMenuItem.length).toBe(2);

    const faqsLink = screen.getByText("FAQs");
    expect(faqsLink).toBeInTheDocument();

    //Help/Support
    const help_supportMenuItem = screen.getAllByText("Help/Support");
    expect(help_supportMenuItem.length).toBe(2);

    //Regulation Patterns
    const regpatternsMenuItem = screen.getByText("Regulatory Partners");
    expect(regpatternsMenuItem).toBeInTheDocument();

    // //Site Map - hidden now
    // const sitemapMenuItem = screen.getByText('Site Map');
    // expect(sitemapMenuItem).toBeInTheDocument();
  });

  test("Log In button renders without errors", () => {
    render(
      <BrowserRouter>
        <SubHeader user={false} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  test("Log In modal renders without errors", () => {
    render(
      <BrowserRouter>
        <SubHeader user={false} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);

    //Modal X button
    expect(screen.getByTestId("closeModalBtn")).toBeInTheDocument();
    //Login form labels
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  const mockUser = { firstName: "FNTest", lastName: "LNTest" };

  test("User Information after Login renders without errors", () => {
    const { container } = render(
      <BrowserRouter>
        <SubHeader user={mockUser} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );

    //Check Initials
    expect(screen.getByTestId("loggedInUserInitials")).toBeInTheDocument();
    const image = screen.getByAltText("Expand menu");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/icons/menu-item-expand.svg");
    //Welcome message
    expect(screen.getByText("Welcome, FNTest!")).toBeInTheDocument();
    //Log out button
    expect(screen.getByText("Log Out")).toBeInTheDocument();

    const logOutBtn = screen.getByText("Log Out");
    fireEvent.click(logOutBtn);

    // const toggleDropDownBTN = container.querySelector("#toggleDropDown");
    // expect(toggleDropDownBTN).toBe(1);

    const toggleDropDownBTN = screen.getByText("Regulatory Partners");
    fireEvent.click(toggleDropDownBTN);
  });

  test("User Profile Options availability", () => {
    render(
      <BrowserRouter>
        <SubHeader user={mockUser} setCurrentLink={jest.fn()} />
      </BrowserRouter>
    );

    //Click image
    const image = screen.getByAltText("Expand menu");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/icons/menu-item-expand.svg");

    fireEvent.click(image);

    //User Profile links
    expect(image).toHaveAttribute(
      "src",
      "/images/icons/menu-item-collapse.svg"
    );
    expect(screen.getByText("Manage Login")).toBeInTheDocument();
    if (config.app.enableManageDelegations !== "false") {
      expect(screen.getByText("Manage Delegations")).toBeInTheDocument();
    }
  });
});
