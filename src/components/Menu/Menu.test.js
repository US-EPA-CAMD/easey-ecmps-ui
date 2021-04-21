import React from 'react'
import Menu from './Menu'
import { render, fireEvent } from "@testing-library/react";

describe('testing updated go-wide template footer menu', () => {
    test("should render footer hamburger menu button", () => {
        const {getByRole} = render(<Menu/>);
        const burgerMenu = getByRole("button");
        expect(burgerMenu).toBeTruthy();
      });
    test("should render the three menu options when hamburger menu is clicked", () => {
        const {getByRole, getAllByRole} = render(<Menu/>);
        const burgerMenu = getByRole("button");
        fireEvent.click(burgerMenu);
        const menuLinks = getAllByRole("link");
        expect(menuLinks.length).toBe(3);
    });
});
